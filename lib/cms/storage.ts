import {get, put} from "@vercel/blob";
import {DEFAULT_CMS_CONTENT, parseCmsContent, type CmsContent} from "./schema";

const DRAFT_PATH = "cms/content/draft.json";
const PUBLISHED_PATH = "cms/content/published.json";

export type CmsSnapshot = {version:1; content:CmsContent; updatedAt:string; updatedBy:string};

async function read(path: string): Promise<CmsSnapshot | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  const blob = await get(path, {access:"private", useCache:false, token:process.env.BLOB_READ_WRITE_TOKEN});
  if (!blob || blob.statusCode !== 200) return null;
  const parsed = await new Response(blob.stream).json() as Partial<CmsSnapshot>;
  if (parsed.version !== 1 || !parsed.content || typeof parsed.updatedAt !== "string" || typeof parsed.updatedBy !== "string") return null;
  return {...parsed, version:1, content:parseCmsContent(parsed.content)} as CmsSnapshot;
}

async function write(path: string, snapshot: CmsSnapshot) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error("Privatna pohrana nije povezana.");
  await put(path, JSON.stringify(snapshot), {
    access:"private",
    addRandomSuffix:false,
    allowOverwrite:true,
    contentType:"application/json",
    token:process.env.BLOB_READ_WRITE_TOKEN,
  });
}

export async function readDraft() {
  return read(DRAFT_PATH);
}

export async function readPublished() {
  return read(PUBLISHED_PATH);
}

export async function saveDraft(content: unknown, updatedBy: string) {
  const snapshot: CmsSnapshot = {version:1, content:parseCmsContent(content), updatedAt:new Date().toISOString(), updatedBy};
  await write(DRAFT_PATH, snapshot);
  return snapshot;
}

export async function publishDraft(updatedBy: string) {
  const draft = await readDraft();
  if (!draft) throw new Error("Nema spremljenog nacrta.");
  const published: CmsSnapshot = {...draft, updatedAt:new Date().toISOString(), updatedBy};
  await write(PUBLISHED_PATH, published);
  return published;
}

export async function initialDraft() {
  return (await readDraft()) || (await readPublished()) || {version:1 as const, content:DEFAULT_CMS_CONTENT, updatedAt:"", updatedBy:""};
}
