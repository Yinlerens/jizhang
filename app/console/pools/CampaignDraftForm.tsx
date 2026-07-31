"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { CalendarRange, CircleAlert, Save, Star } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import type { CampaignItemOption } from "@/lib/control-plane/campaign";
import type { CampaignActionState } from "./actions";

type CampaignAction = (
  previousState: CampaignActionState,
  formData: FormData,
) => Promise<CampaignActionState>;

export type CampaignDraftFormInitialValues = {
  effectiveFrom: string;
  effectiveTo: string;
  featuredItemId: string;
  name: string;
  versionId?: string;
};

const INITIAL_ACTION_STATE: CampaignActionState = { error: null };

export function CampaignDraftForm({
  action,
  initialValues,
  itemOptions,
  mode,
}: {
  action: CampaignAction;
  initialValues: CampaignDraftFormInitialValues;
  itemOptions: CampaignItemOption[];
  mode: "create" | "edit";
}) {
  const [actionState, formAction, pending] = useActionState(action, INITIAL_ACTION_STATE);
  const fiveStarItems = itemOptions.filter((item) => item.rarity === 5);
  const [featuredItemId, setFeaturedItemId] = useState(initialValues.featuredItemId);
  const selectedItem = fiveStarItems.find((item) => item.id === featuredItemId);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input name="featured_item_id" type="hidden" value={featuredItemId} />
      {initialValues.versionId ? (
        <input name="banner_version_id" type="hidden" value={initialValues.versionId} />
      ) : null}

      <section className="grid border-y border-border bg-card lg:grid-cols-[minmax(0,1fr)_280px]">
        <FieldGroup className="p-5 sm:p-6 lg:border-r lg:border-border">
          <Field>
            <FieldLabel htmlFor="campaign-name">活动名称</FieldLabel>
            <Input
              autoComplete="off"
              defaultValue={initialValues.name}
              id="campaign-name"
              maxLength={120}
              name="name"
              placeholder="例如：潮声限定招募"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="featured-character">五星 UP 角色</FieldLabel>
            {fiveStarItems.length > 0 ? (
              <Select onValueChange={setFeaturedItemId} value={featuredItemId}>
                <SelectTrigger className="w-full" id="featured-character">
                  <SelectValue placeholder="选择角色" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectGroup>
                    {fiveStarItems.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <Alert variant="destructive">
                <CircleAlert />
                <AlertTitle>内容库没有五星角色</AlertTitle>
                <AlertDescription>添加五星角色后才能创建活动。</AlertDescription>
              </Alert>
            )}
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="campaign-start">开始时间</FieldLabel>
              <Input
                defaultValue={initialValues.effectiveFrom}
                id="campaign-start"
                name="effective_from"
                required
                type="datetime-local"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="campaign-end">结束时间</FieldLabel>
              <Input
                defaultValue={initialValues.effectiveTo}
                id="campaign-end"
                name="effective_to"
                required
                type="datetime-local"
              />
            </Field>
          </div>
        </FieldGroup>

        <aside className="flex min-h-56 flex-col bg-muted/20 p-5 sm:p-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <CalendarRange aria-hidden="true" className="size-4" />
            活动预览
          </div>
          <div className="mt-5 flex flex-1 flex-col justify-center">
            {selectedItem ? (
              <SelectedItem item={selectedItem} />
            ) : (
              <div className="flex min-h-28 items-center justify-center border-y border-border text-sm text-muted-foreground">
                尚未选择角色
              </div>
            )}
          </div>
          <dl className="mt-5 grid grid-cols-[72px_minmax(0,1fr)] gap-x-3 gap-y-2 border-t border-border pt-4 text-xs">
            <dt className="text-muted-foreground">活动类型</dt>
            <dd className="font-medium text-foreground">限定角色</dd>
            <dt className="text-muted-foreground">活动规则</dt>
            <dd className="font-medium text-foreground">产品标准策略</dd>
          </dl>
        </aside>
      </section>

      {actionState.error ? (
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>草稿未保存</AlertTitle>
          <AlertDescription>{actionState.error}</AlertDescription>
        </Alert>
      ) : null}

      <footer className="flex items-center justify-end gap-3 border-t border-border pt-5">
        <Button asChild disabled={pending} type="button" variant="outline">
          <Link href="/console/pools">取消</Link>
        </Button>
        <Button disabled={pending || fiveStarItems.length === 0} type="submit">
          {pending ? <Spinner data-icon="inline-start" /> : <Save data-icon="inline-start" />}
          {pending ? "正在保存" : mode === "create" ? "创建草稿" : "保存修改"}
        </Button>
      </footer>
    </form>
  );
}

function SelectedItem({ item }: { item: CampaignItemOption }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex items-center gap-4 border-y border-border py-4">
      <span className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted text-muted-foreground">
        {item.imageUrl && !failed ? (
          // Remote content-library hosts are configured at runtime.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt=""
            className="size-full object-cover"
            onError={() => setFailed(true)}
            src={item.imageUrl}
          />
        ) : (
          <Star aria-hidden="true" />
        )}
      </span>
      <div className="min-w-0">
        <FieldTitle className="truncate">{item.name}</FieldTitle>
        <FieldDescription className="mt-1 line-clamp-2">
          {item.subtitle || "五星角色"}
        </FieldDescription>
      </div>
    </div>
  );
}
