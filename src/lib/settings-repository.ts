"use client";

export enum OpenAIModel {
  GPT_3_5_TURBO = "gpt-3.5-turbo",
  GPT_3_5_TURBO_0301 = "gpt-3.5-turbo-0301",
  GPT_3_5_TURBO_0613 = "gpt-3.5-turbo-0613",
  GPT_3_5_TURBO_1106 = "gpt-3.5-turbo-1106",
  GPT_3_5_TURBO_16K = "gpt-3.5-turbo-16k",
  GPT_3_5_TURBO_16K_0613 = "gpt-3.5-turbo-16k-0613",

  GPT_4 = "gpt-4",
  GPT_4_0314 = "gpt-4-0314",
  GPT_4_0613 = "gpt-4-0613",
  GPT_4_1106_PREVIEW = "gpt-4-1106-preview",
  GPT_4_VISION_PREVIEW = "gpt-4-vision-preview",
  GPT_4_32K = "gpt-4-32k",
  GPT_4_32K_0314 = "gpt-4-32k-0314",
  GPT_4_32K_0613 = "gpt-4-32k-0613",
}

class Settings {
  openai = new OpenAI();

  static LOCAL_STORAGE_KEY = "settings";
}

class OpenAI {
  apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  model = OpenAIModel.GPT_3_5_TURBO;
}

export function getAPIKey() {
  return getSettings().openai.apiKey;
}

export function setAPIKey(apiKey: string) {
  const settings = getSettings();
  settings.openai.apiKey = apiKey;
  setSettings(settings);
}

export function getModel() {
  return getSettings().openai.model;
}

export function setModel(model: OpenAIModel) {
  const settings = getSettings();
  settings.openai.model = model;
  setSettings(settings);
}

function getSettings(): Settings {
  if (typeof window !== "undefined") {
    const settings = localStorage.getItem(Settings.LOCAL_STORAGE_KEY);
    return settings ? JSON.parse(settings) : new Settings();
  } else {
    return new Settings();
  }
}

function setSettings(settings: Settings) {
  if (typeof window !== "undefined") {
    localStorage.setItem(Settings.LOCAL_STORAGE_KEY, JSON.stringify(settings));
  }
}
