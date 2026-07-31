"use client";

import { useMemo, useState } from "react";
import {
  Button,
  Card,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Switch,
  Tag,
  Typography,
} from "antd";
import type { TableProps } from "antd";
import {
  deleteRuleSet,
  deleteRuleSetFeaturedRule,
  deleteRuleSetFeaturedRules,
  deleteRuleSetPityRule,
  deleteRuleSetPityRules,
  deleteRuleSetRarityRate,
  deleteRuleSetRarityRates,
  deleteRuleSets,
  upsertRuleSet,
  upsertRuleSetFeaturedRule,
  upsertRuleSetPityRule,
  upsertRuleSetRarityRate,
} from "../rule-sets/actions";
import type {
  GachaRuleSetFeaturedRuleRow,
  GachaRuleSetPityRuleRow,
  GachaRuleSetRarityRateRow,
  GachaRuleSetRow,
} from "@/lib/supabase/database.gacha.types";
import {
  CrudPage,
  FieldGrid,
  FullWidth,
  RateInput,
  bannerTypeOptions,
  bannerTypeTag,
  buildRuleSetMap,
  countRowsByRuleSet,
  createRuleSetOptions,
  enabledBadge,
  featuredGroupOptions,
  formatDateTime,
  groupTag,
  highRarityOptions,
  jsonText,
  ppmText,
  rarityOptions,
  rarityTag,
  requiredRule,
  ruleSetLabel,
  theme,
} from "./shared";

const { Text, Title } = Typography;
const { TextArea } = Input;

type RuleSetSectionKey = "sets" | "rates" | "featured" | "pity";

export function RuleSetsAdminPanel({
  ruleSets,
  rarityRates,
  featuredRules,
  pityRules,
}: {
  ruleSets: GachaRuleSetRow[];
  rarityRates: GachaRuleSetRarityRateRow[];
  featuredRules: GachaRuleSetFeaturedRuleRow[];
  pityRules: GachaRuleSetPityRuleRow[];
}) {
  const [activeSection, setActiveSection] = useState<RuleSetSectionKey>("sets");
  const ruleSetsById = useMemo(() => buildRuleSetMap(ruleSets), [ruleSets]);
  const ruleSetOptions = useMemo(() => createRuleSetOptions(ruleSets), [ruleSets]);
  const rarityRateCounts = useMemo(() => countRowsByRuleSet(rarityRates), [rarityRates]);
  const featuredRuleCounts = useMemo(() => countRowsByRuleSet(featuredRules), [featuredRules]);
  const pityRuleCounts = useMemo(() => countRowsByRuleSet(pityRules), [pityRules]);
  const sectionOptions: { key: RuleSetSectionKey; label: string; count: number }[] = [
    { key: "sets", label: "模板信息", count: ruleSets.length },
    { key: "rates", label: "基础概率", count: rarityRates.length },
    { key: "featured", label: "UP 规则", count: featuredRules.length },
    { key: "pity", label: "保底规则", count: pityRules.length },
  ];

  const ruleSetColumns: TableProps<GachaRuleSetRow>["columns"] = [
    {
      title: "模板",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex flex-col">
          <Text strong>{record.name}</Text>
          <Text type="secondary" className="text-xs">
            {record.id}
          </Text>
        </div>
      ),
    },
    {
      title: "适用卡池",
      dataIndex: "banner_type",
      key: "banner_type",
      render: (value: GachaRuleSetRow["banner_type"]) =>
        value ? bannerTypeTag(value) : <Tag color="blue">通用</Tag>,
    },
    {
      title: "状态",
      dataIndex: "is_enabled",
      key: "is_enabled",
      render: enabledBadge,
    },
    {
      title: "规则内容",
      key: "rule_counts",
      render: (_, record) => (
        <Space size={4} wrap>
          <Tag color="blue">基础 {rarityRateCounts.get(record.id) ?? 0}</Tag>
          <Tag color="magenta">UP {featuredRuleCounts.get(record.id) ?? 0}</Tag>
          <Tag color="green">保底 {pityRuleCounts.get(record.id) ?? 0}</Tag>
        </Space>
      ),
    },
    {
      title: "备注",
      dataIndex: "description",
      key: "description",
      render: (value: string) => (
        <Text className="max-w-md text-slate-500" ellipsis={{ tooltip: value }}>
          {value || "无说明"}
        </Text>
      ),
    },
    {
      title: "更新时间",
      dataIndex: "updated_at",
      key: "updated_at",
      render: formatDateTime,
    },
  ];

  const rateColumns: TableProps<GachaRuleSetRarityRateRow>["columns"] = [
    {
      title: "模板",
      dataIndex: "rule_set_id",
      key: "rule_set_id",
      render: (id: string) => ruleSetLabel(ruleSetsById.get(id)),
    },
    {
      title: "稀有度",
      dataIndex: "rarity",
      key: "rarity",
      render: rarityTag,
      sorter: (a, b) => a.rarity - b.rarity,
    },
    {
      title: "基础概率",
      dataIndex: "base_rate_ppm",
      key: "base_rate_ppm",
      render: (value: number) => (
        <div className="flex flex-col">
          <Text strong>{ppmText(value)}</Text>
          <Text type="secondary" className="text-xs">
            {value.toLocaleString("zh-CN")} ppm
          </Text>
        </div>
      ),
    },
    {
      title: "判定顺序",
      dataIndex: "roll_order",
      key: "roll_order",
      sorter: (a, b) => a.roll_order - b.roll_order,
    },
  ];

  const featuredColumns: TableProps<GachaRuleSetFeaturedRuleRow>["columns"] = [
    {
      title: "模板",
      dataIndex: "rule_set_id",
      key: "rule_set_id",
      render: (id: string) => ruleSetLabel(ruleSetsById.get(id)),
    },
    {
      title: "稀有度",
      dataIndex: "rarity",
      key: "rarity",
      render: rarityTag,
    },
    {
      title: "UP 组",
      dataIndex: "featured_group",
      key: "featured_group",
      render: groupTag,
    },
    {
      title: "UP 概率",
      dataIndex: "featured_rate_ppm",
      key: "featured_rate_ppm",
      render: (value: number) => ppmText(value),
    },
    {
      title: "未中后必出",
      dataIndex: "guarantee_after_miss",
      key: "guarantee_after_miss",
      render: (value: boolean) => (value ? <Tag color="green">是</Tag> : <Tag>否</Tag>),
    },
    {
      title: "写入保底状态",
      dataIndex: "miss_sets_guarantee",
      key: "miss_sets_guarantee",
      render: (value: boolean) => (value ? <Tag color="green">是</Tag> : <Tag>否</Tag>),
    },
  ];

  const pityColumns: TableProps<GachaRuleSetPityRuleRow>["columns"] = [
    {
      title: "模板",
      dataIndex: "rule_set_id",
      key: "rule_set_id",
      render: (id: string) => ruleSetLabel(ruleSetsById.get(id)),
    },
    {
      title: "稀有度",
      dataIndex: "rarity",
      key: "rarity",
      render: rarityTag,
    },
    {
      title: "保底计数器",
      dataIndex: "counter_key",
      key: "counter_key",
    },
    {
      title: "硬保底",
      dataIndex: "hard_pity",
      key: "hard_pity",
      render: (value: number) => `${value} 抽`,
    },
    {
      title: "软保底起点",
      dataIndex: "soft_pity_start",
      key: "soft_pity_start",
      render: (value: number | null) => (value ? `${value} 抽` : "无"),
    },
    {
      title: "软保底递增",
      dataIndex: "soft_pity_increment_ppm",
      key: "soft_pity_increment_ppm",
      render: (value: number) => ppmText(value),
    },
    {
      title: "重置低星",
      dataIndex: "resets_lower_rarity",
      key: "resets_lower_rarity",
      render: (value: boolean) => (value ? <Tag color="green">是</Tag> : <Tag>否</Tag>),
    },
  ];

  return (
    <div className="space-y-4">
      <ConfigProvider theme={theme}>
        <Card>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Text className="text-xs font-bold uppercase tracking-[0.18em] text-[#39746c]">
                Rule Templates
              </Text>
              <Title level={3} className="mb-0! mt-1! text-slate-900!">
                规则模板
              </Title>
              <Text className="text-slate-500">
                每套模板由基础概率、UP 规则和保底规则组成，卡池档期直接绑定模板。
              </Text>
            </div>
            <Space wrap>
              {sectionOptions.map((option) => (
                <Button
                  key={option.key}
                  onClick={() => setActiveSection(option.key)}
                  type={activeSection === option.key ? "primary" : "default"}
                >
                  {option.label} · {option.count}
                </Button>
              ))}
            </Space>
          </div>
        </Card>
      </ConfigProvider>

      {activeSection === "sets" && (
        <CrudPage<GachaRuleSetRow>
          title="模板信息"
          description="维护规则包名称、适用卡池和启用状态；具体概率与保底在同页其它分区配置。"
          createLabel="新增规则包"
          data={ruleSets}
          columns={ruleSetColumns}
          rowKey="id"
          stats={[
            { label: "模板总数", value: ruleSets.length },
            { label: "启用中", value: ruleSets.filter((ruleSet) => ruleSet.is_enabled).length },
            {
              label: "限定池模板",
              value: ruleSets.filter((ruleSet) => ruleSet.banner_type === "limited-character").length,
            },
          ]}
          emptyText="还没有规则包"
          initialValues={(record) => ({
            id: record?.id ?? "",
            name: record?.name ?? "",
            description: record?.description ?? "",
            banner_type: record?.banner_type ?? undefined,
            is_enabled: record?.is_enabled ?? true,
            metadata: jsonText(record?.metadata),
          })}
          drawerTitle={(mode, record) => (mode === "edit" ? `编辑 ${record?.name}` : "新增规则包")}
          renderForm={(_, mode) => (
            <FieldGrid>
              <Form.Item label="规则包 ID" name="id" rules={requiredRule("请输入规则包 ID")}>
                <Input disabled={mode === "edit"} placeholder="default-limited-character" />
              </Form.Item>
              <Form.Item label="规则包名称" name="name" rules={requiredRule("请输入规则包名称")}>
                <Input placeholder="限定角色池默认规则" />
              </Form.Item>
              <Form.Item label="适用卡池" name="banner_type">
                <Select allowClear options={bannerTypeOptions} placeholder="通用模板" />
              </Form.Item>
              <Form.Item label="启用" name="is_enabled" valuePropName="checked">
                <Switch checkedChildren="启用" unCheckedChildren="停用" />
              </Form.Item>
              <FullWidth>
                <Form.Item label="备注" name="description">
                  <TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
                </Form.Item>
              </FullWidth>
              <Form.Item hidden name="metadata">
                <Input />
              </Form.Item>
            </FieldGrid>
          )}
          onSubmit={upsertRuleSet}
          onDelete={(record) => deleteRuleSet(record.id)}
          onBulkDelete={(records) => deleteRuleSets(records.map((record) => record.id))}
          deleteTitle={(record) => `删除 ${record.name} 会同时删除模板下的概率、UP 和保底规则。`}
        />
      )}

      {activeSection === "rates" && (
        <CrudPage<GachaRuleSetRarityRateRow>
          title="模板基础概率"
          description="配置模板内 3/4/5 星的基础出率和判定顺序。"
          createLabel="新增概率"
          data={rarityRates}
          columns={rateColumns}
          rowKey={(record) => `${record.rule_set_id}:${record.rarity}`}
          stats={[
            { label: "概率条目", value: rarityRates.length },
            {
              label: "关联模板",
              value: new Set(rarityRates.map((rate) => rate.rule_set_id)).size,
            },
            { label: "五星规则", value: rarityRates.filter((rate) => rate.rarity === 5).length },
          ]}
          emptyText="还没有模板基础概率"
          initialValues={(record) => ({
            rule_set_id: record?.rule_set_id ?? ruleSets[0]?.id,
            rarity: record?.rarity ?? 5,
            base_rate_ppm: record?.base_rate_ppm ?? 6000,
            roll_order: record?.roll_order ?? 1,
          })}
          drawerTitle={(mode) => (mode === "edit" ? "编辑模板基础概率" : "新增模板基础概率")}
          renderForm={(_, mode) => (
            <FieldGrid>
              <Form.Item label="规则模板" name="rule_set_id" rules={requiredRule("请选择规则模板")}>
                <Select
                  disabled={mode === "edit"}
                  optionFilterProp="label"
                  options={ruleSetOptions}
                  showSearch
                />
              </Form.Item>
              <Form.Item label="稀有度" name="rarity" rules={requiredRule("请选择稀有度")}>
                <Select disabled={mode === "edit"} options={rarityOptions} />
              </Form.Item>
              <RateInput label="基础概率" name="base_rate_ppm" />
              <Form.Item label="判定顺序" name="roll_order" rules={requiredRule("请输入判定顺序")}>
                <InputNumber className="w-full!" min={1} precision={0} />
              </Form.Item>
            </FieldGrid>
          )}
          onSubmit={upsertRuleSetRarityRate}
          onDelete={(record) => deleteRuleSetRarityRate(record.rule_set_id, record.rarity)}
          onBulkDelete={(records) =>
            deleteRuleSetRarityRates(
              records.map((record) => ({
                rule_set_id: record.rule_set_id,
                rarity: record.rarity,
              })),
            )
          }
          deleteTitle={(record) =>
            `删除 ${ruleSetLabel(ruleSetsById.get(record.rule_set_id))} 的 ${record.rarity} 星基础概率`
          }
        />
      )}

      {activeSection === "featured" && (
        <CrudPage<GachaRuleSetFeaturedRuleRow>
          title="模板 UP 规则"
          description="配置模板内 UP 命中概率、歪后保底和保底状态键。"
          createLabel="新增 UP 规则"
          data={featuredRules}
          columns={featuredColumns}
          rowKey={(record) => `${record.rule_set_id}:${record.rarity}:${record.featured_group}`}
          stats={[
            { label: "规则条目", value: featuredRules.length },
            {
              label: "五星 UP",
              value: featuredRules.filter((rule) => rule.rarity === 5).length,
            },
            {
              label: "带保底",
              value: featuredRules.filter((rule) => rule.guarantee_after_miss).length,
            },
          ]}
          emptyText="还没有模板 UP 规则"
          initialValues={(record) => ({
            rule_set_id: record?.rule_set_id ?? ruleSets[0]?.id,
            rarity: record?.rarity ?? 5,
            featured_group: record?.featured_group ?? "five_up",
            featured_rate_ppm: record?.featured_rate_ppm ?? 500000,
            guarantee_after_miss: record?.guarantee_after_miss ?? false,
            miss_sets_guarantee: record?.miss_sets_guarantee ?? false,
            guarantee_state_key: record?.guarantee_state_key ?? "",
          })}
          drawerTitle={(mode) => (mode === "edit" ? "编辑模板 UP 规则" : "新增模板 UP 规则")}
          renderForm={(_, mode) => (
            <FieldGrid>
              <Form.Item label="规则模板" name="rule_set_id" rules={requiredRule("请选择规则模板")}>
                <Select
                  disabled={mode === "edit"}
                  optionFilterProp="label"
                  options={ruleSetOptions}
                  showSearch
                />
              </Form.Item>
              <Form.Item label="稀有度" name="rarity" rules={requiredRule("请选择稀有度")}>
                <Select disabled={mode === "edit"} options={highRarityOptions} />
              </Form.Item>
              <Form.Item label="UP 组" name="featured_group" rules={requiredRule("请选择 UP 组")}>
                <Select disabled={mode === "edit"} options={featuredGroupOptions} />
              </Form.Item>
              <RateInput label="UP 概率" name="featured_rate_ppm" />
              <Form.Item label="未中后下次必出" name="guarantee_after_miss" valuePropName="checked">
                <Switch checkedChildren="是" unCheckedChildren="否" />
              </Form.Item>
              <Form.Item label="未中后写入保底状态" name="miss_sets_guarantee" valuePropName="checked">
                <Switch checkedChildren="是" unCheckedChildren="否" />
              </Form.Item>
              <FullWidth>
                <Form.Item label="保底状态键" name="guarantee_state_key">
                  <Input placeholder="guaranteed_featured_five" />
                </Form.Item>
              </FullWidth>
            </FieldGrid>
          )}
          onSubmit={upsertRuleSetFeaturedRule}
          onDelete={(record) =>
            deleteRuleSetFeaturedRule(record.rule_set_id, record.rarity, record.featured_group)
          }
          onBulkDelete={(records) =>
            deleteRuleSetFeaturedRules(
              records.map((record) => ({
                rule_set_id: record.rule_set_id,
                rarity: record.rarity,
                featured_group: record.featured_group,
              })),
            )
          }
          deleteTitle={(record) => `删除 ${ruleSetLabel(ruleSetsById.get(record.rule_set_id))} 的 UP 规则`}
        />
      )}

      {activeSection === "pity" && (
        <CrudPage<GachaRuleSetPityRuleRow>
          title="模板保底规则"
          description="配置模板内四星、五星的硬保底、软保底起点和递增概率。"
          createLabel="新增保底规则"
          data={pityRules}
          columns={pityColumns}
          rowKey={(record) => `${record.rule_set_id}:${record.rarity}`}
          stats={[
            { label: "规则条目", value: pityRules.length },
            { label: "五星保底", value: pityRules.filter((rule) => rule.rarity === 5).length },
            { label: "含软保底", value: pityRules.filter((rule) => Boolean(rule.soft_pity_start)).length },
          ]}
          emptyText="还没有模板保底规则"
          initialValues={(record) => ({
            rule_set_id: record?.rule_set_id ?? ruleSets[0]?.id,
            rarity: record?.rarity ?? 5,
            counter_key: record?.counter_key ?? "five_star",
            hard_pity: record?.hard_pity ?? 80,
            soft_pity_start: record?.soft_pity_start ?? undefined,
            soft_pity_increment_ppm: record?.soft_pity_increment_ppm ?? 0,
            resets_lower_rarity: record?.resets_lower_rarity ?? false,
          })}
          drawerTitle={(mode) => (mode === "edit" ? "编辑模板保底规则" : "新增模板保底规则")}
          renderForm={(_, mode) => (
            <FieldGrid>
              <Form.Item label="规则模板" name="rule_set_id" rules={requiredRule("请选择规则模板")}>
                <Select
                  disabled={mode === "edit"}
                  optionFilterProp="label"
                  options={ruleSetOptions}
                  showSearch
                />
              </Form.Item>
              <Form.Item label="稀有度" name="rarity" rules={requiredRule("请选择稀有度")}>
                <Select disabled={mode === "edit"} options={highRarityOptions} />
              </Form.Item>
              <Form.Item label="保底计数器" name="counter_key" rules={requiredRule("请输入保底计数器")}>
                <Input placeholder="five_star" />
              </Form.Item>
              <Form.Item label="硬保底" name="hard_pity" rules={requiredRule("请输入硬保底")}>
                <InputNumber className="w-full!" min={1} precision={0} suffix="抽" />
              </Form.Item>
              <Form.Item label="软保底起点" name="soft_pity_start">
                <InputNumber className="w-full!" min={1} precision={0} suffix="抽" />
              </Form.Item>
              <RateInput label="软保底递增" name="soft_pity_increment_ppm" />
              <Form.Item label="命中后重置低星计数" name="resets_lower_rarity" valuePropName="checked">
                <Switch checkedChildren="是" unCheckedChildren="否" />
              </Form.Item>
            </FieldGrid>
          )}
          onSubmit={upsertRuleSetPityRule}
          onDelete={(record) => deleteRuleSetPityRule(record.rule_set_id, record.rarity)}
          onBulkDelete={(records) =>
            deleteRuleSetPityRules(
              records.map((record) => ({
                rule_set_id: record.rule_set_id,
                rarity: record.rarity,
              })),
            )
          }
          deleteTitle={(record) => `删除 ${ruleSetLabel(ruleSetsById.get(record.rule_set_id))} 的保底规则`}
        />
      )}
    </div>
  );
}
