"use client";

import { Modal } from "antd";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

type AuditLogDetailDialogProps = {
  children: ReactNode;
  closeHref: string;
  open: boolean;
  requestId?: string;
};

export function AuditLogDetailDialog({
  children,
  closeHref,
  open,
  requestId,
}: AuditLogDetailDialogProps) {
  const router = useRouter();

  return (
    <Modal
      centered
      destroyOnHidden
      footer={null}
      mask={{ blur: true, closable: true }}
      open={open}
      styles={{
        body: {
          maxHeight: "calc(100vh - 9rem)",
          overflow: "hidden",
          padding: 0,
        },
      }}
      title={
        <div className="min-w-0">
          <div className="text-base font-black text-slate-950">日志详情</div>
          {requestId ? (
            <div className="mt-1 truncate font-mono text-xs font-normal text-slate-500" title={requestId}>
              {requestId}
            </div>
          ) : null}
        </div>
      }
      width="min(1120px, calc(100vw - 2rem))"
      onCancel={() => {
        router.replace(closeHref, { scroll: false });
      }}
    >
      {children}
    </Modal>
  );
}
