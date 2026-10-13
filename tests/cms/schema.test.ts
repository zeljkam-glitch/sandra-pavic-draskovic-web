import assert from "node:assert/strict";
import test from "node:test";
import {DEFAULT_CMS_CONTENT, parseCmsContent} from "../../lib/cms/schema";

test("CMS merges a valid partial edit with safe defaults",()=>{const content=parseCmsContent({homeHeroTitle:"Novi naslov"});assert.equal(content.homeHeroTitle,"Novi naslov");assert.equal(content.contactTitle,DEFAULT_CMS_CONTENT.contactTitle);});
test("CMS rejects unknown fields",()=>{assert.throws(()=>parseCmsContent({notAField:"x"}),/Neispravno polje/);});
test("CMS rejects markup and remote image URLs by treating them as invalid paths",()=>{assert.throws(()=>parseCmsContent({homeHeroImage:"https://example.com/image.jpg"}),/nije dopuštena/);});
test("CMS accepts private media proxy paths",()=>{const path="/api/cms/media/123e4567-e89b-12d3-a456-426614174000.webp";assert.equal(parseCmsContent({homeHeroImage:path}).homeHeroImage,path);});
