import {draftMode} from "next/headers";
import {cache} from "react";
import {getCmsSession} from "./auth";
import {DEFAULT_CMS_CONTENT, type CmsContent} from "./schema";
import {readDraft, readPublished} from "./storage";

export const getCmsContent = cache(async (): Promise<CmsContent> => {
  try {
    const draft = await draftMode();
    if (draft.isEnabled && await getCmsSession()) return (await readDraft())?.content || DEFAULT_CMS_CONTENT;
    return (await readPublished())?.content || DEFAULT_CMS_CONTENT;
  } catch {
    return DEFAULT_CMS_CONTENT;
  }
});
