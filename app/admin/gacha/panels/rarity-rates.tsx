"use client";

import { useMemo } from "react";
import { Form, InputNumber, Select, Space, Typography } from "antd";
import type { TableProps } from "antd";
import { deleteRarityRate, deleteRarityRates, upsertRarityRate } from "../rarity-rates/actions";
import type {
  GachaBannerRow,
  GachaBannerVersionRow,
  GachaRarityRateRow,
} from "@/lib/supabase/database.gacha.types";
import {
  CrudPage,
  FieldGrid,
  RateInput,
  VersionSelect,
  buildBannerMap,
  buildVersionMap,
  createVersionOptions,
  ppmText,
  rarityOptions,
  rarityTag,
  requiredRule,
  versionLabel,
} from "./shared";

const { Text } = Typography;

export function RarityRatesAdminPanel({
  rates,
  versions,
  banners,
}: {
  rates: GachaRarityRateRow[];
  versions: GachaBannerVersionRow[];
  banners: GachaBannerRow[];
}) {
  const bannersById = useMemo(() => buildBannerMap(banners), [banners]);
  const versionsById = useMemo(() => buildVersionMap(versions), [versions]);
  const versionOptions = useMemo(
    () => createVersionOptions(versions, banners),
    [versions, banners],
  );

  const columns: TableProps<GachaRarityRateRow>["columns"] = [
    {
      title: "档期",
      dataIndex: "banner_version_id",
      key: "banner_version_id",
      render: (id: string) => versionLabel(versionsById.get(id), bannersById),
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
        <Space orientation="vertical" size={0}>
          <Text strong>{ppmText(value)}</Text>
          <Text type="secondary" className="text-xs">
            {value.toLocaleString("zh-CN")} ppm
          </Text>
        </Space>
      ),
    },
    {
      title: "判定顺序",
      dataIndex: "roll_order",
      key: "roll_order",
      sorter: (a, b) => a.roll_order - b.roll_order,
    },
  ];

  return (
    <CrudPage<GachaRarityRateRow>
      title="基础概率"
      description="配置每个档期内 3/4/5 星的基础出率和判定顺序。"
      createLabel="新增概率"
      data={rates}
      columns={columns}
      rowKey={(record) => `${record.banner_version_id}:${record.rarity}`}
      stats={[
        { label: "概率条目", value: rates.length },
        {
          label: "关联档期",
          value: new Set(rates.map((rate) => rate.banner_version_id)).size,
        },
        {
          label: "五星规则",
          value: rates.filter((rate) => rate.rarity === 5).length,
        },
      ]}
      emptyText="还没有基础概率"
      initialValues={(record) => ({
        banner_version_id: record?.banner_version_id ?? versions[0]?.id,
        rarity: record?.rarity ?? 5,
        base_rate_ppm: record?.base_rate_ppm ?? 6000,
        roll_order: record?.roll_order ?? 1,
      })}
      drawerTitle={(mode) => (mode === "edit" ? "编辑基础概率" : "新增基础概率")}
      renderForm={(_, mode) => (
        <FieldGrid>
          <VersionSelect disabled={mode === "edit"} options={versionOptions} />
          <Form.Item label="稀有度" name="rarity" rules={requiredRule("请选择稀有度")}>
            <Select disabled={mode === "edit"} options={rarityOptions} />
          </Form.Item>
          <RateInput label="基础概率" name="base_rate_ppm" />
          <Form.Item label="判定顺序" name="roll_order" rules={requiredRule("请输入判定顺序")}>
            <InputNumber className="w-full!" min={1} precision={0} />
          </Form.Item>
        </FieldGrid>
      )}
      onSubmit={upsertRarityRate}
      onDelete={(record) => deleteRarityRate(record.banner_version_id, record.rarity)}
      onBulkDelete={(records) =>
        deleteRarityRates(
          records.map((record) => ({
            banner_version_id: record.banner_version_id,
            rarity: record.rarity,
          })),
        )
      }
      deleteTitle={(record) =>
        `删除 ${versionLabel(versionsById.get(record.banner_version_id), bannersById)} 的 ${record.rarity} 星基础概率`
      }
    />
  );
}
