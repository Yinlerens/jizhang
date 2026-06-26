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
  Switch,
  Table,
  Tag,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import type { FormInstance, TableProps, UploadProps } from "antd";
import { Edit3, ImagePlus, Plus, RefreshCw, Save, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { deleteBanner, deleteBanners, uploadBannerImage, upsertBanner } from "./banners/actions";
import { deleteBannerItem, deleteBannerItems, upsertBannerItem } from "./banner-items/actions";
import {
  deleteBannerVersion,
  deleteBannerVersions,
  upsertBannerVersion,
} from "./banner-versions/actions";
import { deleteFeaturedRule, deleteFeaturedRules, upsertFeaturedRule } from "./featured-rules/actions";
import { deleteItem, deleteItems, upsertItem } from "./items/actions";
import { deletePityRule, deletePityRules, upsertPityRule } from "./pity-rules/actions";
import { deleteRarityRate, deleteRarityRates, upsertRarityRate } from "./rarity-rates/actions";
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
} from "./rule-sets/actions";
import type {
  GachaBannerItemRow,
  GachaBannerRow,
  GachaBannerVersionRow,
  GachaFeaturedRuleRow,
  GachaItemRow,
  GachaPityRuleRow,
  GachaRarity,
  GachaRarityRateRow,
  GachaRuleSetFeaturedRuleRow,
  GachaRuleSetPityRuleRow,
  GachaRuleSetRarityRateRow,
  GachaRuleSetRow,
} from "@/lib/supabase/database.gacha.types";

const { Text, Title } = Typography;
const { TextArea } = Input;
const { useBreakpoint } = Grid;

type FormValues = Record<string, unknown>;
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

type BannerImageFieldName = "cover_image_url" | "background_image_url";

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

const theme = {
  token: {
    colorPrimary: "#e85d75",
    borderRadius: 8,
    colorBgLayout: "#fafafa",
    fontFamily: "var(--font-sans), Microsoft YaHei, PingFang SC, sans-serif",
  },
  components: {
    Card: {
      borderRadiusLG: 8,
    },
    Table: {
      headerBg: "#fff7f8",
      rowHoverBg: "#fff9fa",
    },
    Drawer: {
      paddingLG: 20,
    },
  },
};

const rarityOptions = [5, 4, 3].map((value) => ({
  label: `${value} 星`,
  value,
}));

const highRarityOptions = [5, 4].map((value) => ({
  label: `${value} 星`,
  value,
}));

const itemTypeOptions: SelectOption[] = [
  { label: "角色", value: "character" },
  { label: "武器", value: "weapon" },
];

const bannerTypeOptions: SelectOption[] = [
  { label: "限定角色池", value: "limited-character" },
  { label: "常驻池", value: "standard" },
];

const statusOptions: SelectOption[] = [
  { label: "草稿", value: "draft" },
  { label: "已发布", value: "published" },
  { label: "已归档", value: "archived" },
];

const poolGroupOptions: SelectOption[] = [
  { label: "标准池", value: "standard" },
  { label: "UP 池", value: "featured" },
];

const featuredGroupOptions: SelectOption[] = [
  { label: "五星 UP", value: "five_up" },
  { label: "四星 UP", value: "four_up" },
];

const bannerImageAccept = "image/jpeg,image/png,image/webp,image/avif";
const bannerImageTypes = new Set(bannerImageAccept.split(","));
const maxBannerImageBytes = 8 * 1024 * 1024;

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

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "操作失败，请稍后重试";
}

function jsonText(value: unknown) {
  return JSON.stringify(value ?? {}, null, 2);
}

function formText(value: unknown) {
  return typeof value === "string" ? value : "";
}

function previewBackgroundStyle(imageUrl?: string, position = "center center"): CSSProperties | undefined {
  if (!imageUrl) {
    return undefined;
  }

  return {
    backgroundImage: `url(${JSON.stringify(imageUrl)})`,
    backgroundPosition: position,
  };
}

function formatDateTime(value?: string | null) {
  if (!value) {
    return "未设置";
  }

  return value.replace("T", " ").replace(/\.\d+/, "").slice(0, 16);
}

function toDateTimeLocal(value?: string | null) {
  if (!value) {
    return "";
  }

  return value.slice(0, 16);
}

function ppmText(value: number) {
  return `${(value / 10000).toLocaleString("zh-CN", {
    maximumFractionDigits: 4,
  })}%`;
}

function rarityTag(rarity: GachaRarity | 4 | 5) {
  const color = rarity === 5 ? "gold" : rarity === 4 ? "purple" : "blue";
  return <Tag color={color}>{rarity} 星</Tag>;
}

function enabledBadge(enabled: boolean) {
  return enabled ? <Badge status="success" text="启用" /> : <Badge status="default" text="停用" />;
}

function itemTypeTag(type: GachaItemRow["item_type"]) {
  return type === "character" ? <Tag color="magenta">角色</Tag> : <Tag color="cyan">武器</Tag>;
}

function bannerTypeTag(type: GachaBannerRow["banner_type"]) {
  return type === "limited-character" ? (
    <Tag color="volcano">限定角色池</Tag>
  ) : (
    <Tag color="geekblue">常驻池</Tag>
  );
}

function statusTag(status: GachaBannerVersionRow["status"]) {
  const color = status === "published" ? "green" : status === "archived" ? "default" : "orange";
  const label = status === "published" ? "已发布" : status === "archived" ? "已归档" : "草稿";
  return <Tag color={color}>{label}</Tag>;
}

function groupTag(value: string | null) {
  if (!value) {
    return <Tag>无</Tag>;
  }

  return value === "five_up" ? <Tag color="gold">五星 UP</Tag> : <Tag color="purple">四星 UP</Tag>;
}

function poolTag(value: GachaBannerItemRow["pool_group"]) {
  return value === "featured" ? <Tag color="magenta">UP 池</Tag> : <Tag color="blue">标准池</Tag>;
}

function requiredRule(message = "必填") {
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

function buildBannerMap(banners: GachaBannerRow[]) {
  return new Map(banners.map((banner) => [banner.id, banner]));
}

function buildVersionMap(versions: GachaBannerVersionRow[]) {
  return new Map(versions.map((version) => [version.id, version]));
}

function buildItemMap(items: GachaItemRow[]) {
  return new Map(items.map((item) => [item.id, item]));
}

function buildRuleSetMap(ruleSets: GachaRuleSetRow[]) {
  return new Map(ruleSets.map((ruleSet) => [ruleSet.id, ruleSet]));
}

function countRowsByRuleSet(rows: { rule_set_id: string }[]) {
  const counts = new Map<string, number>();
  rows.forEach((row) => {
    counts.set(row.rule_set_id, (counts.get(row.rule_set_id) ?? 0) + 1);
  });
  return counts;
}

function ruleSetLabel(ruleSet: GachaRuleSetRow | undefined) {
  if (!ruleSet) {
    return "未绑定模板";
  }

  const typeLabel = ruleSet.banner_type
    ? bannerTypeOptions.find((option) => option.value === ruleSet.banner_type)?.label
    : "通用";
  return `${ruleSet.name} · ${typeLabel ?? "通用"}`;
}

function createRuleSetOptions(ruleSets: GachaRuleSetRow[]) {
  return ruleSets.map((ruleSet) => ({
    label: ruleSetLabel(ruleSet),
    value: ruleSet.id,
  }));
}

function defaultRuleSetForBanner(
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

function versionLabel(
  version: GachaBannerVersionRow | undefined,
  bannersById: Map<string, GachaBannerRow>,
) {
  if (!version) {
    return "未知档期";
  }

  const banner = bannersById.get(version.banner_id);
  return `${banner?.name ?? version.banner_id} · v${version.version}`;
}

function createVersionOptions(versions: GachaBannerVersionRow[], banners: GachaBannerRow[]) {
  const bannersById = buildBannerMap(banners);
  return versions.map((version) => ({
    label: `${versionLabel(version, bannersById)} · ${version.status}`,
    value: version.id,
  }));
}

function createItemOptions(items: GachaItemRow[]) {
  return items.map((item) => ({
    label: `${item.name} · ${item.rarity} 星 · ${item.item_type === "character" ? "角色" : "武器"}`,
    value: item.id,
  }));
}

function FieldGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">{children}</div>;
}

function FullWidth({ children }: { children: React.ReactNode }) {
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
      <section className="flex flex-col gap-4 rounded-lg border border-white bg-white/80 p-5 shadow-sm shadow-pink-100/50 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <Text className="text-xs font-bold uppercase tracking-[0.18em] text-rose-400">
            Gacha Admin
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
          <div className="mb-3 flex flex-col gap-3 rounded-lg border border-rose-100 bg-rose-50/70 p-3 md:flex-row md:items-center md:justify-between">
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

function CrudPage<T extends object>(props: CrudPageProps<T>) {
  return (
    <ConfigProvider theme={theme}>
      <CrudPageInner {...props} />
    </ConfigProvider>
  );
}

function JsonFormItem({ label, name }: { label: string; name: string }) {
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

function BannerVisualPreview({ form }: { form: FormInstance<FormValues> }) {
  const name = formText(Form.useWatch("name", form)) || "卡池名称";
  const shortName = formText(Form.useWatch("short_name", form)) || "共鸣";
  const coverImageUrl = formText(Form.useWatch("cover_image_url", form));
  const backgroundImageUrl = formText(Form.useWatch("background_image_url", form));

  return (
    <Card size="small">
      <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div>
          <Text strong>入口图</Text>
          <div className="mt-2 grid min-h-24 grid-cols-[1fr_96px] overflow-hidden rounded-lg border border-slate-200 bg-slate-950 text-left text-white">
            <div className="flex min-w-0 flex-col justify-center px-3 py-2">
              <span className="text-xs text-white/60">角色活动</span>
              <span className="mt-1 truncate text-base font-black">{name}</span>
              <span className="mt-1 inline-flex w-fit bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">
                {shortName}
              </span>
            </div>
            <div
              className="bg-white bg-cover bg-center"
              style={previewBackgroundStyle(coverImageUrl)}
            />
          </div>
        </div>

        <div>
          <Text strong>主视觉背景</Text>
          <div
            className="relative mt-2 min-h-48 overflow-hidden rounded-lg border border-slate-200 bg-white bg-cover bg-center"
            style={previewBackgroundStyle(backgroundImageUrl)}
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.38)_42%,transparent_72%)]" />
            <div className="relative flex h-full min-h-48 flex-col justify-center px-5 py-4 text-white">
              <span className="text-xs font-bold text-amber-200">角色活动共鸣</span>
              <span className="mt-2 text-4xl font-black leading-none">{name}</span>
              <span className="mt-3 text-lg font-bold">{shortName}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function BannerImageUploadFormItem({
  form,
  label,
  name,
  previewClassName,
}: {
  form: FormInstance<FormValues>;
  label: string;
  name: BannerImageFieldName;
  previewClassName: string;
}) {
  const [uploading, setUploading] = useState(false);
  const value = formText(Form.useWatch(name, form));

  const beforeUpload: UploadProps["beforeUpload"] = async (file) => {
    if (!bannerImageTypes.has(file.type)) {
      toast.error("仅支持 JPG、PNG、WebP、AVIF 图片");
      return Upload.LIST_IGNORE;
    }

    if (file.size > maxBannerImageBytes) {
      toast.error("图片不能超过 8MB");
      return Upload.LIST_IGNORE;
    }

    const uploadData = new FormData();
    uploadData.set("field", name);
    uploadData.set("file", file);
    setUploading(true);

    try {
      const url = await uploadBannerImage(uploadData);
      form.setFieldsValue({ [name]: url });
      toast.success(`${label}已上传`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setUploading(false);
    }

    return Upload.LIST_IGNORE;
  };

  return (
    <>
      <Form.Item hidden name={name}>
        <Input />
      </Form.Item>
      <Form.Item label={label}>
        <div className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50/70 p-3 md:grid-cols-[220px_minmax(0,1fr)]">
          <div
            className={`flex items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-white bg-cover bg-center text-xs text-slate-400 shadow-inner ${previewClassName}`}
            style={previewBackgroundStyle(value)}
          >
            {!value && <span>未上传</span>}
          </div>
          <div className="flex min-w-0 flex-col justify-center gap-3">
            <Space wrap>
              <Upload
                accept={bannerImageAccept}
                beforeUpload={beforeUpload}
                disabled={uploading}
                maxCount={1}
                showUploadList={false}
              >
                <Button icon={<ImagePlus size={16} />} loading={uploading}>
                  上传图片
                </Button>
              </Upload>
              {value && (
                <Button
                  disabled={uploading}
                  icon={<Trash2 size={16} />}
                  onClick={() => form.setFieldsValue({ [name]: "" })}
                >
                  清除
                </Button>
              )}
            </Space>
            {value ? (
              <Text className="max-w-full text-xs text-slate-500" copyable={{ text: value }} ellipsis>
                {value}
              </Text>
            ) : (
              <Text className="text-xs text-slate-500">JPG / PNG / WebP / AVIF，最大 8MB</Text>
            )}
          </div>
        </div>
      </Form.Item>
    </>
  );
}

function VersionSelect({ disabled, options }: { disabled?: boolean; options: SelectOption[] }) {
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

function RateInput({ name, label }: { name: string; label: string }) {
  return (
    <Form.Item label={label} name={name} rules={requiredRule(`请输入${label}`)}>
      <InputNumber className="w-full!" max={1000000} min={0} precision={0} suffix="ppm" />
    </Form.Item>
  );
}

function BannerVersionRuleSetSelect({
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
        accent: record?.accent ?? "#e85d75",
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

export function BannersAdminPanel({ banners }: { banners: GachaBannerRow[] }) {
  const columns: TableProps<GachaBannerRow>["columns"] = [
    {
      title: "卡池",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div
            className="h-14 w-24 shrink-0 rounded-md border border-slate-200 bg-white bg-cover bg-center shadow-inner"
            style={previewBackgroundStyle(record.cover_image_url)}
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
      title: "简称",
      dataIndex: "short_name",
      key: "short_name",
    },
    {
      title: "类型",
      dataIndex: "banner_type",
      key: "banner_type",
      render: bannerTypeTag,
    },
    {
      title: "主视觉",
      key: "visual",
      render: (_, record) => (
        <Space size={4} wrap>
          {record.cover_image_url ? <Tag color="blue">入口图</Tag> : <Tag>入口占位</Tag>}
          {record.background_image_url ? <Tag color="green">桌面背景</Tag> : <Tag>背景占位</Tag>}
        </Space>
      ),
    },
    {
      title: "排序",
      dataIndex: "sort_order",
      key: "sort_order",
      sorter: (a, b) => a.sort_order - b.sort_order,
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
    <CrudPage<GachaBannerRow>
      title="卡池类别"
      description="维护常驻、限定等卡池入口信息和展示素材。"
      createLabel="新增卡池"
      data={banners}
      columns={columns}
      rowKey="id"
      stats={[
        { label: "卡池总数", value: banners.length },
        {
          label: "限定池",
          value: banners.filter((banner) => banner.banner_type === "limited-character").length,
        },
        {
          label: "已启用",
          value: banners.filter((banner) => banner.is_enabled).length,
        },
      ]}
      emptyText="还没有卡池配置"
      initialValues={(record) => ({
        id: record?.id,
        name: record?.name,
        short_name: record?.short_name ?? "",
        banner_type: record?.banner_type ?? "limited-character",
        description: record?.description ?? "",
        cover_image_url: record?.cover_image_url ?? "",
        background_image_url: record?.background_image_url ?? "",
        sort_order: record?.sort_order ?? 0,
        is_enabled: record?.is_enabled ?? true,
      })}
      drawerTitle={(mode, record) =>
        mode === "edit" ? `编辑 ${record?.name ?? "卡池"}` : "新增卡池"
      }
      renderForm={(form, mode) => (
        <FieldGrid>
          <FullWidth>
            <BannerVisualPreview form={form} />
          </FullWidth>
          {mode === "edit" ? (
            <Form.Item label="卡池 ID" name="id">
              <Input disabled />
            </Form.Item>
          ) : (
            <Form.Item label="卡池 ID">
              <Input disabled placeholder="保存时自动生成" />
            </Form.Item>
          )}
          <Form.Item label="名称" name="name" rules={requiredRule("请输入名称")}>
            <Input placeholder="归潮观测" />
          </Form.Item>
          <Form.Item label="简称" name="short_name">
            <Input placeholder="限定角色" />
          </Form.Item>
          <Form.Item label="类型" name="banner_type" rules={requiredRule("请选择类型")}>
            <Select options={bannerTypeOptions} />
          </Form.Item>
          <Form.Item label="排序" name="sort_order" rules={requiredRule("请输入排序")}>
            <InputNumber className="w-full!" precision={0} />
          </Form.Item>
          <Form.Item label="启用状态" name="is_enabled" valuePropName="checked">
            <Switch checkedChildren="启用" unCheckedChildren="停用" />
          </Form.Item>
          <FullWidth>
            <Form.Item label="描述" name="description">
              <TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
            </Form.Item>
          </FullWidth>
          <FullWidth>
            <BannerImageUploadFormItem
              form={form}
              label="卡池入口图"
              name="cover_image_url"
              previewClassName="min-h-28"
            />
          </FullWidth>
          <FullWidth>
            <BannerImageUploadFormItem
              form={form}
              label="主视觉背景"
              name="background_image_url"
              previewClassName="min-h-36"
            />
          </FullWidth>
        </FieldGrid>
      )}
      onSubmit={upsertBanner}
      onDelete={(record) => deleteBanner(record.id)}
      onBulkDelete={(records) => deleteBanners(records.map((record) => record.id))}
      deleteTitle={(record) => `删除 ${record.name} 会级联删除它的所有档期配置。`}
    />
  );
}

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
              <Text className="text-xs font-bold uppercase tracking-[0.18em] text-rose-400">
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
