"use client";

import { Form, Input, Select, Space, Switch, Tag, Typography } from "antd";
import type { TableProps } from "antd";
import { deleteItem, deleteItems, upsertItem } from "../items/actions";
import type { GachaItemRow } from "@/lib/supabase/database.gacha.types";
import {
  CrudPage,
  FieldGrid,
  FullWidth,
  JsonFormItem,
  enabledBadge,
  formatDateTime,
  itemTypeOptions,
  itemTypeTag,
  jsonText,
  previewBackgroundStyle,
  rarityOptions,
  rarityTag,
  requiredRule,
} from "./shared";

const { Text } = Typography;
const { TextArea } = Input;

export function ItemsAdminPanel({ items }: { items: GachaItemRow[] }) {
  const columns: TableProps<GachaItemRow>["columns"] = [
    {
      title: "物品",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div
            aria-label={record.name}
            className="h-12 w-9 shrink-0 rounded-md bg-slate-100 bg-cover bg-center"
            role="img"
            style={previewBackgroundStyle(record.image_url)}
          />
          <Space orientation="vertical" size={0}>
            <Text strong>{record.name}</Text>
            <Text type="secondary" className="text-xs">
              {record.id}
            </Text>
          </Space>
        </div>
      ),
    },
    {
      title: "类型",
      dataIndex: "item_type",
      key: "item_type",
      render: itemTypeTag,
      filters: itemTypeOptions.map((option) => ({
        text: option.label,
        value: option.value,
      })),
      onFilter: (value, record) => record.item_type === value,
    },
    {
      title: "稀有度",
      dataIndex: "rarity",
      key: "rarity",
      render: rarityTag,
      sorter: (a, b) => a.rarity - b.rarity,
    },
    {
      title: "定位",
      key: "profile",
      render: (_, record) => (
        <Space size={4} wrap>
          {record.element && <Tag>{record.element}</Tag>}
          {record.role && <Tag>{record.role}</Tag>}
          {record.faction && <Tag>{record.faction}</Tag>}
        </Space>
      ),
    },
    {
      title: "状态",
      dataIndex: "is_enabled",
      key: "is_enabled",
      render: enabledBadge,
    },
    {
      title: "更新时间",
      dataIndex: "updated_at",
      key: "updated_at",
      render: formatDateTime,
    },
  ];

  return (
    <CrudPage<GachaItemRow>
      title="物品图鉴"
      description="维护角色、武器和展示文案，供后续卡池内容引用。"
      createLabel="新增物品"
      data={items}
      columns={columns}
      rowKey="id"
      stats={[
        { label: "物品总数", value: items.length },
        {
          label: "五星物品",
          value: items.filter((item) => item.rarity === 5).length,
        },
        {
          label: "已启用",
          value: items.filter((item) => item.is_enabled).length,
        },
      ]}
      emptyText="还没有物品配置"
      initialValues={(record) => ({
        id: record?.id,
        name: record?.name,
        subtitle: record?.subtitle ?? "",
        item_type: record?.item_type ?? "character",
        rarity: record?.rarity ?? 5,
        element: record?.element ?? "",
        role: record?.role ?? "",
        faction: record?.faction ?? "",
        accent: record?.accent ?? "#2f6f68",
        quote: record?.quote ?? "",
        image_url: record?.image_url ?? "",
        profile: record?.profile ?? "",
        is_enabled: record?.is_enabled ?? true,
        metadata: jsonText(record?.metadata),
      })}
      drawerTitle={(mode, record) =>
        mode === "edit" ? `编辑 ${record?.name ?? "物品"}` : "新增物品"
      }
      renderForm={(form, mode) => (
        <FieldGrid>
          <Form.Item label="物品 ID" name="id" rules={requiredRule("请输入物品 ID")}>
            <Input disabled={mode === "edit"} placeholder="char-example" />
          </Form.Item>
          <Form.Item label="名称" name="name" rules={requiredRule("请输入名称")}>
            <Input placeholder="洛弦" />
          </Form.Item>
          <Form.Item label="副标题" name="subtitle">
            <Input placeholder="归潮的观测者" />
          </Form.Item>
          <Form.Item label="类型" name="item_type" rules={requiredRule("请选择类型")}>
            <Select options={itemTypeOptions} />
          </Form.Item>
          <Form.Item label="稀有度" name="rarity" rules={requiredRule("请选择稀有度")}>
            <Select options={rarityOptions} />
          </Form.Item>
          <Form.Item label="元素" name="element">
            <Input placeholder="导电" />
          </Form.Item>
          <Form.Item label="定位" name="role">
            <Input placeholder="主 C / 辅助 / 训练" />
          </Form.Item>
          <Form.Item label="阵营" name="faction">
            <Input placeholder="白塔档案局" />
          </Form.Item>
          <Form.Item label="强调色" name="accent">
            <Input type="color" />
          </Form.Item>
          <Form.Item label="启用状态" name="is_enabled" valuePropName="checked">
            <Switch checkedChildren="启用" unCheckedChildren="停用" />
          </Form.Item>
          <FullWidth>
            <Form.Item label="引用语" name="quote">
              <TextArea autoSize={{ minRows: 2, maxRows: 5 }} />
            </Form.Item>
          </FullWidth>
          <FullWidth>
            <Form.Item label="立绘 URL" name="image_url">
              <Input placeholder="https://..." />
            </Form.Item>
          </FullWidth>
          <FullWidth>
            <Form.Item label="角色简介" name="profile">
              <TextArea autoSize={{ minRows: 4, maxRows: 10 }} />
            </Form.Item>
          </FullWidth>
          <FullWidth>
            <JsonFormItem label="扩展 metadata" name="metadata" />
          </FullWidth>
        </FieldGrid>
      )}
      onSubmit={upsertItem}
      onDelete={(record) => deleteItem(record.id)}
      onBulkDelete={(records) => deleteItems(records.map((record) => record.id))}
      deleteTitle={(record) => `删除 ${record.name} 后，仍被卡池引用时数据库会拒绝删除。`}
    />
  );
}
