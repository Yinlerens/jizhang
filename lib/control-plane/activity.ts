const CONTROL_ACTIVITY_LABELS: Record<string, string> = {
  "banner.draft_created": "创建卡池草稿",
  "banner.draft_updated": "更新卡池草稿",
  "banner.published": "发布卡池",
  "environment.created": "创建环境",
  "member.added": "添加成员",
  "member.changed": "调整成员权限",
  "project.created": "创建项目",
  "release.published": "发布环境",
  "release.rolled_back": "回滚环境",
};

export function getControlActivityLabel(eventType: string) {
  return CONTROL_ACTIVITY_LABELS[eventType] ?? eventType;
}
