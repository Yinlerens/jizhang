"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import type { CSSProperties, Key } from "react";
import { useRouter } from "next/navigation";
import {
  Badge,
  Button,
  Card,
  ConfigProvider,
  Drawer,
  Empty,
  Form,
  Grid,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import type { FormInstance, TableProps } from "antd";
import { Edit3, Plus, RefreshCw, Save, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import type {
  GachaBannerItemRow,
  GachaBannerRow,
  GachaBannerVersionRow,
  GachaItemRow,
  GachaRarity,
  GachaRuleSetRow,
} from "@/lib/supabase/database.gacha.types";

const { Text, Title } = Typography;
const { TextArea } = Input;
const { useBreakpoint } = Grid;

export type FormValues = Record<string, unknown>;
type CrudMode = "create" | "edit";

type SelectOption = {
  label: string;
  value: string | number;
};

type StatItem = {
  label: string;
  value: number | string;
  suffix?: string;
};


type CrudPageProps<T extends object> = {
  title: string;
  description: string;
  createLabel: string;
  data: T[];
  columns: TableProps<T>["columns"];
  rowKey: TableProps<T>["rowKey"];
  stats: StatItem[];
  emptyText: string;
  initialValues: (record: T | null) => FormValues;
  drawerTitle: (mode: CrudMode, record: T | null) => string;
  renderForm: (form: FormInstance<FormValues>, mode: CrudMode, record: T | null) => React.ReactNode;
  onSubmit: (formData: FormData) => Promise<void>;
  onDelete: (record: T) => Promise<void>;
  onBulkDelete: (records: T[]) => Promise<void>;
  deleteTitle: (record: T) => string;
};

export const theme = {
  token: {
    colorPrimary: "#2f6f68",
    borderRadius: 8,
    colorBgLayout: "#f4f6f5",
    fontFamily: "var(--font-sans), Microsoft YaHei, PingFang SC, sans-serif",
  },
  components: {
    Card: {
      borderRadiusLG: 8,
    },
    Table: {
      headerBg: "#f5f7f6",
      rowHoverBg: "#f1f6f4",
    },
    Drawer: {
      paddingLG: 20,
    },
  },
};

export const rarityOptions = [5, 4, 3].map((value) => ({
  label: `${value} 星`,
  value,
}));

export const highRarityOptions = [5, 4].map((value) => ({
  label: `${value} 星`,
  value,
}));

export const itemTypeOptions: SelectOption[] = [
  { label: "角色", value: "character" },
  { label: "武器", value: "weapon" },
];

export const bannerTypeOptions: SelectOption[] = [
  { label: "限定角色池", value: "limited-character" },
  { label: "常驻池", value: "standard" },
];

export const statusOptions: SelectOption[] = [
  { label: "草稿", value: "draft" },
  { label: "已发布", value: "published" },
  { label: "已归档", value: "archived" },
];

export const poolGroupOptions: SelectOption[] = [
  { label: "标准池", value: "standard" },
  { label: "UP 池", value: "featured" },
];

export const featuredGroupOptions: SelectOption[] = [
  { label: "五星 UP", value: "five_up" },
  { label: "四星 UP", value: "four_up" },
];



function toFormData(values: FormValues) {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    }

    if (value === null) {
      formData.set(key, "");
      return;
    }

    if (typeof value === "boolean") {
      formData.set(key, value ? "true" : "false");
      return;
    }

    formData.set(key, String(value));
  });

  return formData;
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "操作失败，请稍后重试";
}

export function jsonText(value: unknown) {
  return JSON.stringify(value ?? {}, null, 2);
}

export function formText(value: unknown) {
  return typeof value === "string" ? value : "";
}

export function previewBackgroundStyle(imageUrl?: string, position = "center center"): CSSProperties | undefined {
  if (!imageUrl) {
    return undefined;
  }

  return {
    backgroundImage: `url(${JSON.stringify(imageUrl)})`,
    backgroundPosition: position,
  };
}

export function formatDateTime(value?: string | null) {
  if (!value) {
    return "未设置";
  }

  return value.replace("T", " ").replace(/\.\d+/, "").slice(0, 16);
}

export function toDateTimeLocal(value?: string | null) {
  if (!value) {
    return "";
  }

  return value.slice(0, 16);
}

export function ppmText(value: number) {
  return `${(value / 10000).toLocaleString("zh-CN", {
    maximumFractionDigits: 4,
  })}%`;
}

export function rarityTag(rarity: GachaRarity | 4 | 5) {
  const color = rarity === 5 ? "gold" : rarity === 4 ? "purple" : "blue";
  return <Tag color={color}>{rarity} 星</Tag>;
}

export function enabledBadge(enabled: boolean) {
  return enabled ? <Badge status="success" text="启用" /> : <Badge status="default" text="停用" />;
}

export function itemTypeTag(type: GachaItemRow["item_type"]) {
  return type === "character" ? <Tag color="magenta">角色</Tag> : <Tag color="cyan">武器</Tag>;
}

export function bannerTypeTag(type: GachaBannerRow["banner_type"]) {
  return type === "limited-character" ? (
    <Tag color="volcano">限定角色池</Tag>
  ) : (
    <Tag color="geekblue">常驻池</Tag>
  );
}

export function statusTag(status: GachaBannerVersionRow["status"]) {
  const color = status === "published" ? "green" : status === "archived" ? "default" : "orange";
  const label = status === "published" ? "已发布" : status === "archived" ? "已归档" : "草稿";
  return <Tag color={color}>{label}</Tag>;
}

export function groupTag(value: string | null) {
  if (!value) {
    return <Tag>无</Tag>;
  }

  return value === "five_up" ? <Tag color="gold">五星 UP</Tag> : <Tag color="purple">四星 UP</Tag>;
}

export function poolTag(value: GachaBannerItemRow["pool_group"]) {
  return value === "featured" ? <Tag color="magenta">UP 池</Tag> : <Tag color="blue">标准池</Tag>;
}

export function requiredRule(message = "必填") {
  return [{ required: true, message }];
}

const jsonObjectRule = {
  validator(_: unknown, value?: string) {
    if (!value) {
      return Promise.resolve();
    }

    try {
      const parsed = JSON.parse(value);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        return Promise.reject(new Error("请输入 JSON 对象"));
      }

      return Promise.resolve();
    } catch {
      return Promise.reject(new Error("请输入合法 JSON"));
    }
  },
};

export function buildBannerMap(banners: GachaBannerRow[]) {
  return new Map(banners.map((banner) => [banner.id, banner]));
}

export function buildVersionMap(versions: GachaBannerVersionRow[]) {
  return new Map(versions.map((version) => [version.id, version]));
}

export function buildItemMap(items: GachaItemRow[]) {
  return new Map(items.map((item) => [item.id, item]));
}

export function buildRuleSetMap(ruleSets: GachaRuleSetRow[]) {
  return new Map(ruleSets.map((ruleSet) => [ruleSet.id, ruleSet]));
}

export function countRowsByRuleSet(rows: { rule_set_id: string }[]) {
  const counts = new Map<string, number>();
  rows.forEach((row) => {
    counts.set(row.rule_set_id, (counts.get(row.rule_set_id) ?? 0) + 1);
  });
  return counts;
}

export function ruleSetLabel(ruleSet: GachaRuleSetRow | undefined) {
  if (!ruleSet) {
    return "未绑定模板";
  }

  const typeLabel = ruleSet.banner_type
    ? bannerTypeOptions.find((option) => option.value === ruleSet.banner_type)?.label
    : "通用";
  return `${ruleSet.name} · ${typeLabel ?? "通用"}`;
}

export function createRuleSetOptions(ruleSets: GachaRuleSetRow[]) {
  return ruleSets.map((ruleSet) => ({
    label: ruleSetLabel(ruleSet),
    value: ruleSet.id,
  }));
}

export function defaultRuleSetForBanner(
  bannerId: string | undefined,
  banners: GachaBannerRow[],
  ruleSets: GachaRuleSetRow[],
) {
  const banner = banners.find((item) => item.id === bannerId) ?? banners[0];
  const exactTypeRuleSet = ruleSets.find(
    (ruleSet) => ruleSet.is_enabled && ruleSet.banner_type === banner?.banner_type,
  );
  const genericRuleSet = ruleSets.find((ruleSet) => ruleSet.is_enabled && !ruleSet.banner_type);
  return exactTypeRuleSet?.id ?? genericRuleSet?.id ?? ruleSets[0]?.id;
}

export function versionLabel(
  version: GachaBannerVersionRow | undefined,
  bannersById: Map<string, GachaBannerRow>,
) {
  if (!version) {
    return "未知档期";
  }

  const banner = bannersById.get(version.banner_id);
  return `${banner?.name ?? version.banner_id} · v${version.version}`;
}

export function createVersionOptions(versions: GachaBannerVersionRow[], banners: GachaBannerRow[]) {
  const bannersById = buildBannerMap(banners);
  return versions.map((version) => ({
    label: `${versionLabel(version, bannersById)} · ${version.status}`,
    value: version.id,
  }));
}

export function createItemOptions(items: GachaItemRow[]) {
  return items.map((item) => ({
    label: `${item.name} · ${item.rarity} 星 · ${item.item_type === "character" ? "角色" : "武器"}`,
    value: item.id,
  }));
}

export function FieldGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">{children}</div>;
}

export function FullWidth({ children }: { children: React.ReactNode }) {
  return <div className="md:col-span-2">{children}</div>;
}

function getRecordRowKey<T extends object>(
  rowKey: TableProps<T>["rowKey"],
  record: T,
  index: number,
): Key {
  if (typeof rowKey === "function") {
    return rowKey(record, index);
  }

  if (typeof rowKey === "string") {
    const value = (record as Record<string, unknown>)[rowKey];
    if (typeof value === "string" || typeof value === "number" || typeof value === "bigint") {
      return value;
    }
  }

  return index;
}

function CrudPageInner<T extends object>({
  title,
  description,
  createLabel,
  data,
  columns,
  rowKey,
  stats,
  emptyText,
  initialValues,
  drawerTitle,
  renderForm,
  onSubmit,
  onDelete,
  onBulkDelete,
  deleteTitle,
}: CrudPageProps<T>) {
  const [form] = Form.useForm<FormValues>();
  const router = useRouter();
  const screens = useBreakpoint();
  const [editing, setEditing] = useState<T | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [working, setWorking] = useState(false);
  const [isPending, startTransition] = useTransition();

  const mode: CrudMode = editing ? "edit" : "create";
  const busy = working || isPending;
  const recordByRowKey = useMemo(
    () =>
      new Map<Key, T>(
        data.map((record, index) => [getRecordRowKey(rowKey, record, index), record]),
      ),
    [data, rowKey],
  );
  const availableSelectedRowKeys = useMemo(
    () => selectedRowKeys.filter((key) => recordByRowKey.has(key)),
    [recordByRowKey, selectedRowKeys],
  );
  const selectedRecords = useMemo(
    () =>
      availableSelectedRowKeys
        .map((key) => recordByRowKey.get(key))
        .filter((record): record is T => Boolean(record)),
    [availableSelectedRowKeys, recordByRowKey],
  );
  const selectedCount = availableSelectedRowKeys.length;

  const openEditor = (record: T | null) => {
    setEditing(record);
    form.resetFields();
    form.setFieldsValue(initialValues(record));
    setOpen(true);
  };

  const closeEditor = () => {
    setOpen(false);
    setEditing(null);
    form.resetFields();
  };

  const runSubmit = (values: FormValues) => {
    startTransition(async () => {
      setWorking(true);
      try {
        await onSubmit(toFormData(values));
        toast.success("已保存");
        closeEditor();
        router.refresh();
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setWorking(false);
      }
    });
  };

  const runDelete = (record: T) => {
    startTransition(async () => {
      setWorking(true);
      try {
        await onDelete(record);
        toast.success("已删除");
        router.refresh();
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setWorking(false);
      }
    });
  };

  const runBulkDelete = () => {
    const recordsToDelete = selectedRecords;

    if (recordsToDelete.length === 0) {
      toast.warning("请先选择要删除的数据");
      return;
    }

    startTransition(async () => {
      setWorking(true);
      try {
        await onBulkDelete(recordsToDelete);
        toast.success(`已删除 ${recordsToDelete.length} 条`);
        setSelectedRowKeys([]);
        router.refresh();
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setWorking(false);
      }
    });
  };

  const tableColumns: TableProps<T>["columns"] = [
    ...(columns ?? []),
    {
      title: "操作",
      key: "actions",
      width: 116,
      fixed: "right",
      render: (_, record) => (
        <Space size={4}>
          <Tooltip title="编辑">
            <Button
              aria-label="编辑"
              disabled={busy}
              icon={<Edit3 size={15} />}
              onClick={() => openEditor(record)}
              size="small"
              type="text"
            />
          </Tooltip>
          <Popconfirm
            title="确认删除"
            description={deleteTitle(record)}
            okText="删除"
            cancelText="取消"
            okButtonProps={{ danger: true }}
            onConfirm={() => runDelete(record)}
          >
            <Tooltip title="删除">
              <Button
                aria-label="删除"
                danger
                disabled={busy}
                icon={<Trash2 size={15} />}
                size="small"
                type="text"
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <section className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <Text className="text-xs font-bold uppercase tracking-[0.18em] text-[#39746c]">
            GachaOps Configuration
          </Text>
          <Title level={2} className="mb-2! mt-2! text-slate-900!">
            {title}
          </Title>
          <Text className="text-slate-500">{description}</Text>
        </div>
        <Space wrap>
          <Tooltip title="刷新当前配置">
            <Button icon={<RefreshCw size={16} />} onClick={() => router.refresh()}>
              刷新
            </Button>
          </Tooltip>
          <Button icon={<Plus size={16} />} onClick={() => openEditor(null)} type="primary">
            {createLabel}
          </Button>
        </Space>
      </section>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} size="small">
            <Statistic
              title={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              styles={{ content: { color: "#172033", fontWeight: 800 } }}
            />
          </Card>
        ))}
      </div>

      <Card>
        {selectedCount > 0 && (
          <div className="mb-3 flex flex-col gap-3 rounded-lg border border-emerald-100 bg-emerald-50/60 p-3 md:flex-row md:items-center md:justify-between">
            <Space wrap>
              <Text strong>已选择 {selectedCount} 条</Text>
              <Button disabled={busy} onClick={() => setSelectedRowKeys([])} size="small">
                清空选择
              </Button>
            </Space>
            <Popconfirm
              cancelText="取消"
              description={`将删除当前选中的 ${selectedCount} 条数据。关联数据会按数据库外键规则处理。`}
              okButtonProps={{ danger: true, loading: busy }}
              okText="删除"
              onConfirm={runBulkDelete}
              title="确认批量删除"
            >
              <Button danger disabled={busy} icon={<Trash2 size={16} />}>
                批量删除
              </Button>
            </Popconfirm>
          </div>
        )}
        <Table<T>
          columns={tableColumns}
          dataSource={data}
          loading={busy}
          locale={{
            emptyText: <Empty description={emptyText} image={Empty.PRESENTED_IMAGE_SIMPLE} />,
          }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
          rowKey={rowKey}
          rowSelection={{
            columnWidth: 48,
            getCheckboxProps: () => ({
              disabled: busy,
            }),
            onChange: (keys) => setSelectedRowKeys(keys),
            selectedRowKeys: availableSelectedRowKeys,
          }}
          scroll={{ x: "max-content" }}
          size="medium"
        />
      </Card>

      <Drawer
        closable={{ "aria-label": "关闭" }}
        destroyOnHidden
        extra={
          <Space>
            <Button icon={<X size={16} />} onClick={closeEditor}>
              取消
            </Button>
            <Button
              icon={<Save size={16} />}
              loading={busy}
              onClick={() => form.submit()}
              type="primary"
            >
              保存
            </Button>
          </Space>
        }
        onClose={closeEditor}
        open={open}
        title={drawerTitle(mode, editing)}
        size={screens.lg ? 720 : "100%"}
      >
        <Form
          autoComplete="off"
          form={form}
          layout="vertical"
          onFinish={runSubmit}
          requiredMark="optional"
        >
          {renderForm(form, mode, editing)}
        </Form>
      </Drawer>
    </div>
  );
}

export function CrudPage<T extends object>(props: CrudPageProps<T>) {
  return (
    <ConfigProvider theme={theme}>
      <CrudPageInner {...props} />
    </ConfigProvider>
  );
}

export function JsonFormItem({ label, name }: { label: string; name: string }) {
  return (
    <Form.Item label={label} name={name} rules={[jsonObjectRule]}>
      <TextArea
        autoSize={{ minRows: 4, maxRows: 10 }}
        spellCheck={false}
        style={{ fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace" }}
      />
    </Form.Item>
  );
}


export function VersionSelect({ disabled, options }: { disabled?: boolean; options: SelectOption[] }) {
  return (
    <Form.Item label="卡池档期" name="banner_version_id" rules={requiredRule("请选择卡池档期")}>
      <Select
        disabled={disabled}
        optionFilterProp="label"
        options={options}
        placeholder="选择卡池档期"
        showSearch
      />
    </Form.Item>
  );
}

export function RateInput({ name, label }: { name: string; label: string }) {
  return (
    <Form.Item label={label} name={name} rules={requiredRule(`请输入${label}`)}>
      <InputNumber className="w-full!" max={1000000} min={0} precision={0} suffix="ppm" />
    </Form.Item>
  );
}

export function BannerVersionRuleSetSelect({
  form,
  banners,
  ruleSets,
}: {
  form: FormInstance<FormValues>;
  banners: GachaBannerRow[];
  ruleSets: GachaRuleSetRow[];
}) {
  const bannerId = formText(Form.useWatch("banner_id", form));
  const selectedRuleSetId = formText(Form.useWatch("rule_set_id", form));
  const selectedBanner = banners.find((banner) => banner.id === bannerId) ?? banners[0];
  const selectedBannerId = selectedBanner?.id;
  const selectedBannerType = selectedBanner?.banner_type;
  const compatibleRuleSets = ruleSets.filter(
    (ruleSet) =>
      !selectedBannerType ||
      !ruleSet.banner_type ||
      ruleSet.banner_type === selectedBannerType ||
      ruleSet.id === selectedRuleSetId,
  );
  const options = createRuleSetOptions(compatibleRuleSets.length ? compatibleRuleSets : ruleSets);

  useEffect(() => {
    if (!ruleSets.length || !selectedBannerId || !selectedBannerType) {
      return;
    }

    const selectedRuleSet = ruleSets.find((ruleSet) => ruleSet.id === selectedRuleSetId);
    const selectedIsCompatible =
      selectedRuleSet &&
      (!selectedRuleSet.banner_type || selectedRuleSet.banner_type === selectedBannerType);

    if (!selectedIsCompatible) {
      form.setFieldsValue({
        rule_set_id: defaultRuleSetForBanner(selectedBannerId, banners, ruleSets),
      });
    }
  }, [banners, form, ruleSets, selectedBannerId, selectedBannerType, selectedRuleSetId]);

  return (
    <Form.Item label="规则模板" name="rule_set_id" rules={requiredRule("请选择规则模板")}>
      <Select optionFilterProp="label" options={options} placeholder="选择规则模板" showSearch />
    </Form.Item>
  );
}

export function GachaAdminError({ description }: { description: string }) {
  useEffect(() => {
    toast.error("配置加载失败", {
      description,
    });
  }, [description]);

  return (
    <ConfigProvider theme={theme}>
      <div className="rounded-lg border border-slate-200 bg-white p-10 text-center text-slate-500">
        配置加载失败
      </div>
    </ConfigProvider>
  );
}
