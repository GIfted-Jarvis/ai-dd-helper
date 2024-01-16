"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { OpenAIModel, setAPIKey, getAPIKey, setModel, getModel } from "@/lib/settings-repository";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  apiKey: z.string().min(1, { message: "Required." }),
  model: z.nativeEnum(OpenAIModel),
});

type FormValuesType = z.infer<typeof formSchema>;

export default function SettingsOpenAIPage() {
  const form = useForm<FormValuesType>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: { apiKey: getAPIKey(), model: getModel() },
  });

  function onSubmit(values: FormValuesType) {
    setAPIKey(values.apiKey);
    setModel(values.model);
  }

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem className="mt-6 flex flex-wrap items-center">
                  <FormLabel className="w-[100px]">API Key</FormLabel>
                  <FormControl className="w-[800px] mr-4">
                    <Input placeholder="Type your api key here." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem className="mt-6 flex flex-wrap items-center">
                  <FormLabel className="w-[100px]">Model</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl className="w-[800px] mr-4">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(OpenAIModel).map((it) => {
                        return (
                          <SelectItem key={it} value={it}>
                            {it}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-6">
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
