"use client";

import { useMemo } from "react";
import { Form, Input, InputNumber, Select, Switch, Tag } from "antd";
import type { TableProps } from "antd";
import { deletePityRule, deletePityRules, upsertPityRule } from "../pity-rules/actions";
import type {
  GachaBannerRow,
  GachaBannerVersionRow,
  GachaPityRuleRow,
} from "@/lib/supabase/database.gacha.types";
import {
  CrudPage,
  FieldGrid,
  RateInput,
  VersionSelect,
  buildBannerMap,
  buildVersionMap,
  createVersionOptions,
  highRarityOptions,
  ppmText,
  rarityTag,
  requiredRule,
  versionLabel,
} from "./shared";

export function PityRulesAdminPanel({
  rules,
  versions,
  banners,
}: {
  rules: GachaPityRuleRow[];
  versions: GachaBannerVersionRow[];
  banners: GachaBannerRow[];
}) {
  const bannersById = useMemo(() => buildBannerMap(banners), [banners]);
  const versionsById = useMemo(() => buildVersionMap(versions), [versions]);
  const versionOptions = useMemo(
    () => createVersionOptions(versions, banners),
    [versions, banners],
  );

  const columns: TableProps<GachaPityRuleRow>["columns"] = [
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
    },
    {
      title: "计数器",
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
    <CrudPage<GachaPityRuleRow>
      title="水位规则"
      description="配置四星、五星计数器、硬保底和软保底递增。"
      createLabel="新增水位规则"
      data={rules}
      columns={columns}
      rowKey={(record) => `${record.banner_version_id}:${record.rarity}`}
      stats={[
        { label: "规则条目", value: rules.length },
        {
          label: "五星水位",
          value: rules.filter((rule) => rule.rarity === 5).length,
        },
        {
          label: "含软保底",
          value: rules.filter((rule) => Boolean(rule.soft_pity_start)).length,
        },
      ]}
      emptyText="还没有水位规则"
      initialValues={(record) => ({
        banner_version_id: record?.banner_version_id ?? versions[0]?.id,
        rarity: record?.rarity ?? 5,
        counter_key: record?.counter_key ?? "five_star",
        hard_pity: record?.hard_pity ?? 80,
        soft_pity_start: record?.soft_pity_start ?? undefined,
        soft_pity_increment_ppm: record?.soft_pity_increment_ppm ?? 0,
        resets_lower_rarity: record?.resets_lower_rarity ?? false,
      })}
      drawerTitle={(mode) => (mode === "edit" ? "编辑水位规则" : "新增水位规则")}
      renderForm={(_, mode) => (
        <FieldGrid>
          <VersionSelect disabled={mode === "edit"} options={versionOptions} />
          <Form.Item label="稀有度" name="rarity" rules={requiredRule("请选择稀有度")}>
            <Select disabled={mode === "edit"} options={highRarityOptions} />
          </Form.Item>
          <Form.Item label="计数器键" name="counter_key" rules={requiredRule("请输入计数器键")}>
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
      onSubmit={upsertPityRule}
      onDelete={(record) => deletePityRule(record.banner_version_id, record.rarity)}
      onBulkDelete={(records) =>
        deletePityRules(
          records.map((record) => ({
            banner_version_id: record.banner_version_id,
            rarity: record.rarity,
          })),
        )
      }
      deleteTitle={(record) => `删除 ${record.rarity} 星水位规则`}
    />
  );
}
