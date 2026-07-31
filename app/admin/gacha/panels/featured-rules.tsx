"use client";

import { useMemo } from "react";
import { Form, Input, Select, Switch, Tag } from "antd";
import type { TableProps } from "antd";
import {
  deleteFeaturedRule,
  deleteFeaturedRules,
  upsertFeaturedRule,
} from "../featured-rules/actions";
import type {
  GachaBannerRow,
  GachaBannerVersionRow,
  GachaFeaturedRuleRow,
} from "@/lib/supabase/database.gacha.types";
import {
  CrudPage,
  FieldGrid,
  FullWidth,
  RateInput,
  VersionSelect,
  buildBannerMap,
  buildVersionMap,
  createVersionOptions,
  featuredGroupOptions,
  groupTag,
  highRarityOptions,
  ppmText,
  rarityTag,
  requiredRule,
  versionLabel,
} from "./shared";

export function FeaturedRulesAdminPanel({
  rules,
  versions,
  banners,
}: {
  rules: GachaFeaturedRuleRow[];
  versions: GachaBannerVersionRow[];
  banners: GachaBannerRow[];
}) {
  const bannersById = useMemo(() => buildBannerMap(banners), [banners]);
  const versionsById = useMemo(() => buildVersionMap(versions), [versions]);
  const versionOptions = useMemo(
    () => createVersionOptions(versions, banners),
    [versions, banners],
  );

  const columns: TableProps<GachaFeaturedRuleRow>["columns"] = [
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

  return (
    <CrudPage<GachaFeaturedRuleRow>
      title="UP 保底规则"
      description="配置 UP 命中概率、歪后保底，以及保底状态键。"
      createLabel="新增 UP 规则"
      data={rules}
      columns={columns}
      rowKey={(record) => `${record.banner_version_id}:${record.rarity}:${record.featured_group}`}
      stats={[
        { label: "规则条目", value: rules.length },
        {
          label: "五星 UP",
          value: rules.filter((rule) => rule.rarity === 5).length,
        },
        {
          label: "带保底",
          value: rules.filter((rule) => rule.guarantee_after_miss).length,
        },
      ]}
      emptyText="还没有 UP 保底规则"
      initialValues={(record) => ({
        banner_version_id: record?.banner_version_id ?? versions[0]?.id,
        rarity: record?.rarity ?? 5,
        featured_group: record?.featured_group ?? "five_up",
        featured_rate_ppm: record?.featured_rate_ppm ?? 500000,
        guarantee_after_miss: record?.guarantee_after_miss ?? false,
        miss_sets_guarantee: record?.miss_sets_guarantee ?? false,
        guarantee_state_key: record?.guarantee_state_key ?? "",
      })}
      drawerTitle={(mode) => (mode === "edit" ? "编辑 UP 规则" : "新增 UP 规则")}
      renderForm={(_, mode) => (
        <FieldGrid>
          <VersionSelect disabled={mode === "edit"} options={versionOptions} />
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
      onSubmit={upsertFeaturedRule}
      onDelete={(record) =>
        deleteFeaturedRule(record.banner_version_id, record.rarity, record.featured_group)
      }
      onBulkDelete={(records) =>
        deleteFeaturedRules(
          records.map((record) => ({
            banner_version_id: record.banner_version_id,
            rarity: record.rarity,
            featured_group: record.featured_group,
          })),
        )
      }
      deleteTitle={(record) => `删除 ${record.rarity} 星 ${record.featured_group} 规则`}
    />
  );
}
