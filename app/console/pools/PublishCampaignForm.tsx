"use client";

import { useActionState } from "react";
import { CircleAlert, RadioTower } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import type { CampaignActionState } from "./actions";
import { publishCampaignDraft } from "./actions";

const INITIAL_ACTION_STATE: CampaignActionState = { error: null };

export function PublishCampaignForm({
  campaignName,
  versionId,
}: {
  campaignName: string;
  versionId: string;
}) {
  const [state, formAction, pending] = useActionState(
    publishCampaignDraft,
    INITIAL_ACTION_STATE,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <RadioTower data-icon="inline-start" />
          发布
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>发布“{campaignName}”</DialogTitle>
          <DialogDescription>
            发布后会生成新的环境版本，并把该卡池加入当前生效配置。
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="flex flex-col gap-5">
          <input name="banner_version_id" type="hidden" value={versionId} />
          {state.error ? (
            <Alert variant="destructive">
              <CircleAlert />
              <AlertTitle>发布未完成</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          ) : null}
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={pending} type="button" variant="outline">
                取消
              </Button>
            </DialogClose>
            <Button disabled={pending} type="submit">
              {pending ? (
                <Spinner data-icon="inline-start" />
              ) : (
                <RadioTower data-icon="inline-start" />
              )}
              {pending ? "正在发布" : "确认发布"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
