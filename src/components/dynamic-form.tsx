"use client";

import * as z from "zod";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Updater, useImmer } from "use-immer";
import { zodResolver } from "@hookform/resolvers/zod";

import { PrimaryComponent } from "@/lib/project-repository";

import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const itemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Required" }),
  desc: z.string().default(""),
});

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Required" }),
  desc: z.string().default(""),
  items: z.array(itemSchema),
});

export type ItemType = z.infer<typeof itemSchema>;
export type FormValuesType = z.infer<typeof formSchema>;

export function DynamicForm({
  component,
  itemName,
  setter,
  dialogTriggerButton,
  initialValues,
}: {
  component: PrimaryComponent;
  itemName: string;
  setter: Function;
  dialogTriggerButton: JSX.Element;
  initialValues?: FormValuesType;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [formValues, setFormValues] = useImmer({
    id: initialValues?.id || uuidv4(),
    name: initialValues?.name || "",
    desc: initialValues?.desc || "",
    items: initialValues?.items || [{ id: uuidv4(), name: "", desc: "" }],
  });

  const form = useForm<FormValuesType>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: formValues,
  });

  useEffect(() => {
    form.reset(formValues);
  }, [formValues, form]);

  const onSubmit = (values: FormValuesType) => {
    console.log(values);
    setter(values);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{dialogTriggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{component} Component</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-wrap max-w-[820px] text-center">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-wrap w-[400px] h-16">
                    <FormLabel className="w-[100px] mt-5">{component} name</FormLabel>
                    <FormControl className="w-[300px]">
                      <Input
                        placeholder="Type here"
                        {...field}
                        value={formValues.name}
                        onChange={(e) => {
                          setFormValues((draft) => {
                            draft.name = e.target.value;
                          });
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-xs ml-[100px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem className="flex flex-wrap w-[400px] h-16">
                    <FormLabel className="w-[100px] mt-5">{component} desc</FormLabel>
                    <FormControl className="w-[300px]">
                      <Input
                        placeholder="Type here"
                        {...field}
                        value={formValues.desc}
                        onChange={(e) => {
                          setFormValues((draft) => {
                            draft.desc = e.target.value;
                          });
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-xs ml-[100px]" />
                  </FormItem>
                )}
              />

              <Separator className="my-4 w-[820px]" />

              {formValues.items.map((it, i) => (
                <div key={`${it.id}`} className="flex">
                  <FormField
                    control={form.control}
                    name={`items.${i}.name`}
                    render={({ field }) => (
                      <FormItem className="flex flex-wrap w-[400px] h-16">
                        <FormLabel className="w-[100px] mt-5">{itemName} name</FormLabel>
                        <FormControl className="w-[300px]">
                          <Input
                            placeholder="Type here"
                            {...field}
                            value={formValues.items[i].name}
                            onChange={(e) => {
                              setFormValues((draft) => {
                                draft.items[i].name = e.target.value;
                              });
                            }}
                          />
                        </FormControl>
                        <FormMessage className="text-xs ml-[100px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`items.${i}.desc`}
                    render={({ field }) => (
                      <FormItem className="flex flex-wrap w-[400px] h-16">
                        <FormLabel className="w-[100px] mt-5">{itemName} desc</FormLabel>
                        <FormControl className="w-[300px]">
                          <Input
                            placeholder="Type here"
                            {...field}
                            value={formValues.items[i].desc}
                            onChange={(e) => {
                              setFormValues((draft) => {
                                draft.items[i].desc = e.target.value;
                              });
                            }}
                          />
                        </FormControl>
                        <FormMessage className="text-xs ml-[100px]" />
                      </FormItem>
                    )}
                  />
                  {i !== 0 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 mt-5"
                      onClick={() => {
                        setFormValues((draft) => {
                          draft.items = draft.items.filter((item) => it.id !== item.id);
                        });
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}

              <FormFooter setFormValues={setFormValues} />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

const FormFooter = ({ setFormValues }: { setFormValues: Updater<FormValuesType> }) => (
  <div className="flex w-[820px] justify-between">
    <AddRowButton setFormValues={setFormValues} />
    <Button type="submit" className="mr-5">
      Submit
    </Button>
  </div>
);

const AddRowButton = ({ setFormValues }: { setFormValues: Updater<FormValuesType> }) => (
  <Button
    variant="ghost"
    size="icon"
    className="h-4 w-4 ml-[410px]"
    onClick={() => {
      setFormValues((draft) => {
        draft.items.push({ id: uuidv4(), name: "", desc: "" });
      });
    }}
  >
    <Plus className="h-4 w-4" />
  </Button>
);
