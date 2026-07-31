"use client";

import { useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Switch,
  Tag,
  Typography,
  Upload,
} from "antd";
import type { FormInstance, TableProps, UploadProps } from "antd";
import { ImagePlus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteBanner, deleteBanners, uploadBannerImage, upsertBanner } from "../banners/actions";
import type { GachaBannerRow } from "@/lib/supabase/database.gacha.types";
import {
  type FormValues,
  CrudPage,
  FieldGrid,
  FullWidth,
  bannerTypeOptions,
  bannerTypeTag,
  enabledBadge,
  formatDateTime,
  formText,
  getErrorMessage,
  previewBackgroundStyle,
  requiredRule,
} from "./shared";

const { Text } = Typography;
const { TextArea } = Input;

type BannerImageFieldName = "cover_image_url" | "background_image_url";

const bannerImageAccept = "image/jpeg,image/png,image/webp,image/avif";
const bannerImageTypes = new Set(bannerImageAccept.split(","));
const maxBannerImageBytes = 8 * 1024 * 1024;

function BannerVisualPreview({ form }: { form: FormInstance<FormValues> }) {
  const name = formText(Form.useWatch("name", form)) || "卡池名称";
  const shortName = formText(Form.useWatch("short_name", form)) || "活动池";
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
              <span className="text-xs font-bold text-amber-200">限定角色池</span>
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
