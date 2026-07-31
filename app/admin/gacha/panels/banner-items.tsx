"use client";

import { useMemo } from "react";
import { Form, InputNumber, Select, Space, Typography } from "antd";
import type { TableProps } from "antd";
import { deleteBannerItem, deleteBannerItems, upsertBannerItem } from "../banner-items/actions";
import type {
  GachaBannerItemRow,
  GachaBannerRow,
  GachaBannerVersionRow,
  GachaItemRow,
} from "@/lib/supabase/database.gacha.types";
import {
  CrudPage,
  FieldGrid,
  VersionSelect,
  buildBannerMap,
  buildItemMap,
  buildVersionMap,
  createItemOptions,
  createVersionOptions,
  featuredGroupOptions,
  groupTag,
  itemTypeTag,
  poolGroupOptions,
  poolTag,
  rarityTag,
  requiredRule,
  versionLabel,
} from "./shared";

const { Text } = Typography;

export function BannerItemsAdminPanel({
  bannerItems,
  versions,
  banners,
  items,
}: {
  bannerItems: GachaBannerItemRow[];
  versions: GachaBannerVersionRow[];
  banners: GachaBannerRow[];
  items: GachaItemRow[];
}) {
  const bannersById = useMemo(() => buildBannerMap(banners), [banners]);
  const versionsById = useMemo(() => buildVersionMap(versions), [versions]);
  const itemsById = useMemo(() => buildItemMap(items), [items]);
  const versionOptions = useMemo(
    () => createVersionOptions(versions, banners),
    [versions, banners],
  );
  const itemOptions = useMemo(() => createItemOptions(items), [items]);

  const columns: TableProps<GachaBannerItemRow>["columns"] = [
    {
      title: "档期",
      dataIndex: "banner_version_id",
      key: "banner_version_id",
      render: (id: string) => versionLabel(versionsById.get(id), bannersById),
    },
    {
      title: "物品",
      dataIndex: "item_id",
      key: "item_id",
      render: (id: string) => {
        const item = itemsById.get(id);
        return item ? (
          <Space orientation="vertical" size={0}>
            <Text strong>{item.name}</Text>
            <Space size={4} wrap>
              {itemTypeTag(item.item_type)}
              {rarityTag(item.rarity)}
            </Space>
          </Space>
        ) : (
          id
        );
      },
    },
    {
      title: "池组",
      dataIndex: "pool_group",
      key: "pool_group",
      render: poolTag,
    },
    {
      title: "UP 组",
      dataIndex: "featured_group",
      key: "featured_group",
      render: groupTag,
    },
    {
      title: "权重",
      dataIndex: "weight",
      key: "weight",
      sorter: (a, b) => a.weight - b.weight,
    },
    {
      title: "排序",
      dataIndex: "sort_order",
      key: "sort_order",
      sorter: (a, b) => a.sort_order - b.sort_order,
    },
  ];

  return (
    <CrudPage<GachaBannerItemRow>
      title="卡池内容"
      description="配置某个档期内有哪些角色和武器，以及它们所属的标准池或 UP 组。"
      createLabel="新增内容"
      data={bannerItems}
      columns={columns}
      rowKey={(record) => `${record.banner_version_id}:${record.item_id}`}
      stats={[
        { label: "内容条目", value: bannerItems.length },
        {
          label: "UP 条目",
          value: bannerItems.filter((item) => item.pool_group === "featured").length,
        },
        {
          label: "关联档期",
          value: new Set(bannerItems.map((item) => item.banner_version_id)).size,
        },
      ]}
      emptyText="还没有卡池内容"
      initialValues={(record) => ({
        banner_version_id: record?.banner_version_id ?? versions[0]?.id,
        item_id: record?.item_id ?? items[0]?.id,
        pool_group: record?.pool_group ?? "standard",
        featured_group: record?.featured_group ?? undefined,
        weight: record?.weight ?? 1,
        sort_order: record?.sort_order ?? 0,
      })}
      drawerTitle={(mode) => (mode === "edit" ? "编辑卡池内容" : "新增卡池内容")}
      renderForm={(_, mode) => (
        <FieldGrid>
          <VersionSelect disabled={mode === "edit"} options={versionOptions} />
          <Form.Item label="物品" name="item_id" rules={requiredRule("请选择物品")}>
            <Select
              disabled={mode === "edit"}
              optionFilterProp="label"
              options={itemOptions}
              placeholder="选择物品"
              showSearch
            />
          </Form.Item>
          <Form.Item label="池组" name="pool_group" rules={requiredRule("请选择池组")}>
            <Select options={poolGroupOptions} />
          </Form.Item>
          <Form.Item label="UP 组" name="featured_group">
            <Select allowClear options={featuredGroupOptions} placeholder="无 UP 组" />
          </Form.Item>
          <Form.Item label="权重" name="weight" rules={requiredRule("请输入权重")}>
            <InputNumber className="w-full!" min={1} precision={0} />
          </Form.Item>
          <Form.Item label="排序" name="sort_order" rules={requiredRule("请输入排序")}>
            <InputNumber className="w-full!" precision={0} />
          </Form.Item>
        </FieldGrid>
      )}
      onSubmit={upsertBannerItem}
      onDelete={(record) => deleteBannerItem(record.banner_version_id, record.item_id)}
      onBulkDelete={(records) =>
        deleteBannerItems(
          records.map((record) => ({
            banner_version_id: record.banner_version_id,
            item_id: record.item_id,
          })),
        )
      }
      deleteTitle={(record) => {
        const item = itemsById.get(record.item_id);
        return `从该档期移除 ${item?.name ?? record.item_id}`;
      }}
    />
  );
}
