"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  UserPlus, 
  Trash2, 
  Coins, 
  Undo2, 
  History, 
  Users, 
  RefreshCw,
  Plus,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner"
const supabase = createClient();

export default function GameAdminDemo() {
  const [activeTab, setActiveTab] = useState<"players" | "logs">("players");
  const [players, setPlayers] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [newUsername, setNewUsername] = useState("");
  
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [amount, setAmount] = useState(100);
  const [reason, setReason] = useState("");

  const [editingPlayer, setEditingPlayer] = useState<any>(null);
  const [editUsername, setEditUsername] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const { data: playersData } = await supabase
      .from("players")
      .select("*")
      .order("created_at", { ascending: false });
    
    const { data: logsData } = await supabase
      .from("balance_logs")
      .select("*, players(username)")
      .order("created_at", { ascending: false });

    setPlayers(playersData || []);
    setLogs(logsData || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addPlayer = async () => {
    if (!newUsername) return;
    const { error } = await supabase
      .from("players")
      .insert({ username: newUsername });
    
    if (error) toast(error.message);
    else {
      setNewUsername("");
      fetchData();
    }
  };

  const updatePlayer = async () => {
    if (!editingPlayer || !editUsername) return;
    const { error } = await supabase
      .from("players")
      .update({ username: editUsername })
      .eq("id", editingPlayer.id);
    
    if (error) toast(error.message);
    else {
      setEditingPlayer(null);
      fetchData();
    }
  };

  const deletePlayer = async (id: string) => {
    if (!confirm("确定删除该玩家吗？数据将无法恢复。")) return;
    const { error } = await supabase.from("players").delete().eq("id", id);
    if (error) toast(error.message);
    else fetchData();
  };

  const giveMoney = async () => {
    if (!selectedPlayer || amount <= 0) return;
    const { error } = await supabase.rpc("admin_give_money", {
      target_player_id: selectedPlayer.id,
      amount_to_give: amount,
      give_reason: reason || "管理员发放"
    });

    if (error) toast(error.message);
    else {
      setSelectedPlayer(null);
      setAmount(100);
      setReason("");
      fetchData();
    }
  };

  const revokeMoney = async (logId: number) => {
    const revokeReason = prompt("请输入收回原因：", "操作撤回");
    if (revokeReason === null) return;

    const { error } = await supabase.rpc("admin_revoke_money", {
      log_entry_id: logId,
      revoke_reason: revokeReason
    });

    if (error) toast(error.message);
    else fetchData();
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto font-sans bg-gray-50 min-h-screen">
      <Link href="/test" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 transition-colors">
        <ArrowLeft size={16} /> 返回测试列表
      </Link>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <div className="bg-yellow-100 p-2 rounded-lg">
                <Coins className="text-yellow-600" size={24} />
            </div>
            Demo
          </h1>
        </div>
        <button 
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm active:scale-95"
          title="刷新数据"
        >
          <RefreshCw className={`w-4 h-4 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
          <span className="text-sm font-medium text-gray-700">刷新数据</span>
        </button>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-gray-200/50 rounded-xl w-fit mb-8">
        <button
          onClick={() => setActiveTab("players")}
          className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
            activeTab === "players" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Users size={18} /> 列表
        </button>
        <button
          onClick={() => setActiveTab("logs")}
          className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
            activeTab === "logs" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <History size={18} /> 余额流水
        </button>
      </div>

      {activeTab === "players" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Player Section */}
          <section className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2 text-gray-800">
              <UserPlus size={20} className="text-green-500" /> 添加
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">玩家用户名</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="例如: KingPlayer_99"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                />
              </div>
              <button
                onClick={addPlayer}
                disabled={!newUsername}
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
              >
                <Plus size={18} /> 创建
              </button>
            </div>
          </section>

          {/* Players Table Section */}
          <section className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-6 py-4 font-bold text-gray-400 text-xs uppercase">用户名</th>
                    <th className="px-6 py-4 font-bold text-gray-400 text-xs uppercase text-right">当前余额</th>
                    <th className="px-6 py-4 font-bold text-gray-400 text-xs uppercase text-center">操作管理</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {players.length > 0 ? (
                    players.map((player) => (
                        <tr key={player.id} className="hover:bg-gray-50/30 transition-colors group">
                        <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                                    {player.username.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-bold text-gray-800">{player.username}</span>
                            </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                            <span className="text-yellow-600 font-black text-lg">
                            🪙 {player.balance.toLocaleString()}
                            </span>
                        </td>
                        <td className="px-6 py-5">
                            <div className="flex justify-center gap-2">
                            <button
                                onClick={() => {
                                setEditingPlayer(player);
                                setEditUsername(player.username);
                                }}
                                className="flex items-center gap-2 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors font-bold text-xs"
                            >
                                编辑
                            </button>
                            <button
                                onClick={() => setSelectedPlayer(player)}
                                className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-bold text-xs"
                            >
                                <Plus size={14} /> 发钱
                            </button>
                            <button
                                onClick={() => deletePlayer(player.id)}
                                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                title="删除玩家"
                            >
                                <Trash2 size={16} />
                            </button>
                            </div>
                        </td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan={3} className="px-6 py-16 text-center">
                            <div className="flex flex-col items-center gap-2">
                                <Users size={40} className="text-gray-200" />
                                <p className="text-gray-400 font-medium">暂无玩家数据，请先创建。</p>
                            </div>
                        </td>
                    </tr>
                    )}
                </tbody>
                </table>
            </div>
          </section>
        </div>
      ) : (
        /* Logs Section */
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-6 py-4 font-bold text-gray-400 text-xs uppercase">操作时间</th>
                    <th className="px-6 py-4 font-bold text-gray-400 text-xs uppercase">玩家</th>
                    <th className="px-6 py-4 font-bold text-gray-400 text-xs uppercase text-right">变动金额</th>
                    <th className="px-6 py-4 font-bold text-gray-400 text-xs uppercase">类型</th>
                    <th className="px-6 py-4 font-bold text-gray-400 text-xs uppercase">备注</th>
                    <th className="px-6 py-4 font-bold text-gray-400 text-xs uppercase text-center">操作</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                {logs.length > 0 ? (
                    logs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50/30 transition-colors text-sm">
                        <td className="px-6 py-5 text-gray-500 whitespace-nowrap">
                        {new Date(log.created_at).toLocaleString('zh-CN', { hour12: false })}
                        </td>
                        <td className="px-6 py-5 font-bold text-gray-700">
                        {log.players?.username || "已删除玩家"}
                        </td>
                        <td className={`px-6 py-5 text-right font-black text-base ${
                        log.amount > 0 ? "text-green-600" : "text-red-600"
                        }`}>
                        {log.amount > 0 ? "+" : ""}{log.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            log.type === "give" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                            {log.type === "give" ? "发放" : "收回"}
                        </span>
                        </td>
                        <td className="px-6 py-5 text-gray-500 max-w-50 truncate" title={log.reason}>
                        {log.reason}
                        </td>
                        <td className="px-6 py-5 text-center">
                        {log.type === "give" && !logs.some(l => l.original_log_id === log.id) && (
                            <button
                            onClick={() => revokeMoney(log.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors text-[11px] font-black"
                            >
                            <Undo2 size={12} /> 撤回
                            </button>
                        )}
                        {log.type === "give" && logs.some(l => l.original_log_id === log.id) && (
                            <span className="text-gray-300 text-[10px] font-bold italic">已撤回</span>
                        )}
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center gap-2">
                            <History size={40} className="text-gray-200" />
                            <p className="text-gray-400 font-medium">暂无流水记录。</p>
                        </div>
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Edit Player Modal */}
      {editingPlayer && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-gray-100 animate-in fade-in zoom-in duration-200">
            <h3 className="text-2xl font-black mb-8 text-gray-800">编辑玩家</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">用户名</label>
                <input
                  type="text"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white outline-none transition-all font-bold text-gray-800"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-10">
              <button
                onClick={() => setEditingPlayer(null)}
                className="flex-1 px-6 py-4 bg-gray-100 text-gray-500 rounded-2xl hover:bg-gray-200 transition-all font-bold"
              >
                取消
              </button>
              <button
                onClick={updatePlayer}
                className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all font-bold"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Give Money Modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-gray-100 transform transition-all animate-in fade-in zoom-in duration-200">
            <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-gray-800">
              <div className="bg-blue-100 p-2 rounded-xl">
                <Coins className="text-blue-600" size={24} />
              </div>
              发放金币
            </h3>
            
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-8">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">目标玩家</p>
              <p className="text-lg font-bold text-gray-800">
                {selectedPlayer.username}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">发放金额</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-600 font-bold">🪙</div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-500 outline-none transition-all text-xl font-black text-gray-800"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">备注原因</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="可选，例如: 赛季补偿"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-500 outline-none h-24 transition-all resize-none text-gray-700"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-10">
              <button
                onClick={() => setSelectedPlayer(null)}
                className="flex-1 px-6 py-4 bg-gray-100 text-gray-500 rounded-2xl hover:bg-gray-200 transition-all font-bold"
              >
                取消
              </button>
              <button
                onClick={giveMoney}
                className="flex-2 px-6 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-200"
              >
                确认发放
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
