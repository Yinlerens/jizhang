"use client";

import { useMemo } from "react";
import { Form, Input, InputNumber, Select, Space, Tag, Typography } from "antd";
import type { TableProps } from "antd";
import {
  deleteBannerVersion,
  deleteBannerVersions,
  upsertBannerVersion,
} from "../banner-versions/actions";
import type {
  GachaBannerRow,
  GachaBannerVersionRow,
  GachaRuleSetRow,
} from "@/lib/supabase/database.gacha.types";
import {
  BannerVersionRuleSetSelect,
  CrudPage,
  FieldGrid,
  FullWidth,
  buildBannerMap,
  buildRuleSetMap,
  defaultRuleSetForBanner,
  formatDateTime,
  requiredRule,
  statusOptions,
  statusTag,
  toDateTimeLocal,
  versionLabel,
} from "./shared";

const { Text } = Typography;
const { TextArea } = Input;

export function BannerVersionsAdminPanel({
  versions,
  banners,
  ruleSets,
}: {
  versions: GachaBannerVersionRow[];
  banners: GachaBannerRow[];
  ruleSets: GachaRuleSetRow[];
}) {
  const bannersById = useMemo(() => buildBannerMap(banners), [banners]);
  const ruleSetsById = useMemo(() => buildRuleSetMap(ruleSets), [ruleSets]);

  const columns: TableProps<GachaBannerVersionRow>["columns"] = [
    {
      title: "档期",
      dataIndex: "id",
      key: "id",
      render: (_, record) => (
        <Space orientation="vertical" size={0}>
          <Text strong>{versionLabel(record, bannersById)}</Text>
          <Text type="secondary" className="text-xs">
            {record.id}
          </Text>
        </Space>
      ),
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: statusTag,
    },
    {
      title: "规则模板",
      dataIndex: "rule_set_id",
      key: "rule_set_id",
      render: (id: string | null) => {
        const ruleSet = id ? ruleSetsById.get(id) : undefined;
        return ruleSet ? (
          <Space orientation="vertical" size={0}>
            <Text strong>{ruleSet.name}</Text>
            <Text type="secondary" className="text-xs">
              {ruleSet.id}
            </Text>
          </Space>
        ) : (
          <Tag>未绑定</Tag>
        );
      },
    },
    {
      title: "生效时间",
      dataIndex: "effective_from",
      key: "effective_from",
      render: formatDateTime,
    },
    {
      title: "结束时间",
      dataIndex: "effective_to",
      key: "effective_to",
      render: formatDateTime,
    },
    {
      title: "发布时间",
      dataIndex: "published_at",
      key: "published_at",
      render: formatDateTime,
    },
  ];

  return (
    <CrudPage<GachaBannerVersionRow>
      title="卡池档期"
      description="为每个卡池维护版本、生效窗口和发布状态。"
      createLabel="新增档期"
      data={versions}
      columns={columns}
      rowKey="id"
      stats={[
        { label: "档期总数", value: versions.length },
        {
          label: "已发布",
          value: versions.filter((version) => version.status === "published").length,
        },
        { label: "草稿", value: versions.filter((version) => version.status === "draft").length },
      ]}
      emptyText="还没有卡池档期"
      initialValues={(record) => ({
        id: record?.id,
        banner_id: record?.banner_id ?? banners[0]?.id,
        rule_set_id:
          record?.rule_set_id ??
          defaultRuleSetForBanner(record?.banner_id ?? banners[0]?.id, banners, ruleSets),
        version: record?.version ?? 1,
        status: record?.status ?? "draft",
        effective_from:
          toDateTimeLocal(record?.effective_from) || new Date().toISOString().slice(0, 16),
        effective_to: toDateTimeLocal(record?.effective_to),
        published_at: toDateTimeLocal(record?.published_at),
        notes: record?.notes ?? "",
      })}
      drawerTitle={(mode, record) =>
        mode === "edit" ? `编辑 ${versionLabel(record ?? undefined, bannersById)}` : "新增档期"
      }
      renderForm={(form, mode) => (
        <FieldGrid>
          {mode === "edit" && (
            <FullWidth>
              <Form.Item label="档期 ID" name="id">
                <Input disabled />
              </Form.Item>
            </FullWidth>
          )}
          <Form.Item label="所属卡池" name="banner_id" rules={requiredRule("请选择卡池")}>
            <Select
              disabled={mode === "edit"}
              optionFilterProp="label"
              options={banners.map((banner) => ({
                label: `${banner.name} · ${banner.id}`,
                value: banner.id,
              }))}
              showSearch
            />
          </Form.Item>
          <Form.Item label="版本号" name="version" rules={requiredRule("请输入版本号")}>
            <InputNumber className="w-full!" min={1} precision={0} />
          </Form.Item>
          <BannerVersionRuleSetSelect form={form} banners={banners} ruleSets={ruleSets} />
          <Form.Item label="状态" name="status" rules={requiredRule("请选择状态")}>
            <Select options={statusOptions} />
          </Form.Item>
          <Form.Item label="生效时间" name="effective_from" rules={requiredRule("请输入生效时间")}>
            <Input type="datetime-local" />
          </Form.Item>
          <Form.Item label="结束时间" name="effective_to">
            <Input type="datetime-local" />
          </Form.Item>
          <Form.Item label="发布时间" name="published_at">
            <Input type="datetime-local" />
          </Form.Item>
          <FullWidth>
            <Form.Item label="备注" name="notes">
              <TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
            </Form.Item>
          </FullWidth>
        </FieldGrid>
      )}
      onSubmit={upsertBannerVersion}
      onDelete={(record) => deleteBannerVersion(record.id)}
      onBulkDelete={(records) => deleteBannerVersions(records.map((record) => record.id))}
      deleteTitle={(record) =>
        `删除 ${versionLabel(record, bannersById)} 会级联删除概率、保底与卡池内容。`
      }
    />
  );
}
