import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { differenceInDays, format } from "date-fns";
import { CalendarIcon, Check, ChevronLeft, ChevronsUpDown } from "lucide-react";
import Fuse from "fuse.js";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMisc } from "@/context/miscellaneousContext";
import { Link, useNavigate } from "react-router-dom";
import { useAsset } from "@/context/assetContext";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

const formSchema = z.object({
  asset_name: z.string(),
  category_id: z.string(),
  sub_category_id: z.string(),
  type_id: z.string(),
  location: z.string(),
  availability_status_id: z.string(),
  serial_number: z.string(),
  specifications: z.string(),
  asset_amount: z.coerce.number(),
  warranty_duration: z.number(),
  warranty_due_date: z.date(),
  purchase_date: z.date(),
  notes: z.string(),
  brand: z.string(),
  insurance: z.string(),
  file: z.instanceof(File).optional(),
});

function AssetForm() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);

  const {
    category,
    subcategory,
    type,
    filteredSubcategories,
    setCategoryID,
    setSubCategoryID,
    subCategoryID,
    status,
    categoryID,
  } = useMisc();

  const { insertAsset } = useAsset();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      asset_name: "",
      category_id: "",
      sub_category_id: "",
      type_id: "",
      location: "",
      availability_status_id: "",
      serial_number: "",
      specifications: "",
      asset_amount: 0,
      warranty_duration: 0,
      warranty_due_date: new Date(),
      purchase_date: new Date(),
      notes: "",
      brand: "",
      insurance: "",
      file: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await form.trigger();
    const errors = form.formState.errors;
    
    if (Object.keys(errors).length > 0) {
      console.log("Form has errors:", errors);
      toast.error("Please fix the errors before submitting.");
      return;
    }
    
    if (matches.length > 0) {
      toast.error("Invalid subcategory! It has a similar name in the stocks.");
      return;
    }

    values.category_id = category.find(
      (cat) => cat.category_name === values.category_id
    )?.category_id;

    const hasSubcategory = subcategory.find( (sc) => sc.sub_category_name === values.sub_category_id)

    if (!hasSubcategory) {
      values.sub_category_name = values.sub_category_id;
      values.sub_category_id = null;
    }else{
      values.sub_category_id = hasSubcategory.sub_category_id
      delete values.sub_category_name
    }

    if (values.type_id) {
      values.type_id = type.find(
        (ty) => ty.type_name === values.type_id
      )?.type_id;
    }

    if (values.availability_status_id) {
      values.availability_status_id = status.find(
        (ty) => ty.status_name === values.availability_status_id
      )?.status_id;
    }

    if (categoryID !== 2) {
      values.sub_category_id = "";
    }

    if (values.sub_category_id === "") {
      values.type_id = "";
    }


    try {
      const response = await insertAsset(values);

      if (response && Object.keys(response).length > 0) {
        toast.success("Asset successfully added! 🎉");
        navigate("/assets")
      } else {
        toast.error(
          `Failed to add asset: ${response?.error || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  const subcategoryFuse = new Fuse(subcategory, {
    keys: ["sub_category_name"],
    threshold: 0.3,
  });

  const typeFuse = new Fuse(type, {
    keys: ["type_name"],
    threshold: 0.4,
  });

  const [filteredResults, setFilteredResults] = useState(subcategory);
  const { setError, clearErrors } = form;

  const p = form.watch("purchase_date");
  const w = form.watch("warranty_due_date");
  const [open, setOpen] = useState(false);
  const value = form.watch("sub_category_id");
  return (
    <div className="flex flex-col ml-[calc(7rem+10px)] mt-15px mr-[calc(2.5rem)] h-full ">
      <div className="flex flex-row items-center justify-between">
        <p className="pl-1 pt-5 mb-4 text-lg">New Asset</p>
        <Link to="/assets">
          <Button variant="link">
            <ChevronLeft />
            <p>Back</p>
          </Button>
        </Link>
      </div>
      <div className="w-[calc(100vw-10rem)] rounded-xl bg-white min-h-[calc(100vh-13.10rem)] h-auto p-5 mb-5">
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)();
            }}
            encType="multipart/form-data"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="serial_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Serial Number</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Serial Number"
                          className="text-sm sm:text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            setCategoryID(() => {
                              const item = category.find(
                                (c) => c.category_name === value
                              );

                              if (item) {
                                return Number(item.category_id);
                              }
                              return null;
                            });
                          }}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {category.map((cat) => (
                              <SelectItem
                                key={cat.category_name}
                                value={cat.category_name}
                              >
                                {cat.category_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {filteredSubcategories.length > 0 && (
                  <FormField
                    control={form.control}
                    name="sub_category_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">
                          Subcategory
                        </FormLabel>
                        <FormControl>
                          <Popover
                            open={open}
                            onOpenChange={(isOpen) => {
                              setOpen(isOpen);
                              if (isOpen) setFilteredResults(subcategory);
                            }}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between text-left font-normal truncate"
                              >
                                <span
                                  className={
                                    field.value ? "text-black" : "text-gray-500"
                                  }
                                >
                                  {field.value || "Select or Type Subcategory"}
                                </span>
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="min-w-[var(--radix-popover-trigger-width)] w-full p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Search or type a subcategory..."
                                  className="h-9 px-3 text-sm text-black focus:ring-0 focus:outline-none"
                                  value={field.value}
                                  onValueChange={(val) => {
                                    field.onChange(val);
                                    const hasMatch = [
                                      ...typeFuse.search(val),
                                      ...subcategoryFuse.search(val),
                                    ];
                                    setMatches(hasMatch);
                                    setFilteredResults(subcategory);
                                    if (hasMatch.length != 0) {
                                      setError("sub_category_id", {
                                        type: "manual",
                                        message: ""
                                      });
                                    } else {
                                      clearErrors("sub_category_id");
                                    }
                                  }}
                                />
                                <CommandList>
                                  <CommandEmpty>
                                    {matches.length > 0
                                      ? "There is similar in stocks, check it"
                                      : "No subcategory found."}
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {filteredResults.map((sub) => (
                                      <CommandItem
                                        key={sub.sub_category_name}
                                        value={sub.sub_category_name}
                                        onSelect={() => {
                                          field.onChange(sub.sub_category_name);
                                          setSubCategoryID(
                                            Number(sub.sub_category_id)
                                          );
                                          setOpen(false);
                                        }}
                                        className="text-sm text-black"
                                      >
                                        {sub.sub_category_name}
                                        <Check
                                          className={cn(
                                            "ml-auto",
                                            field.value ===
                                              sub.sub_category_name
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {subCategoryID === 5 && categoryID === 2 && (
                  <FormField
                    control={form.control}
                    name="type_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                              {type.map((type) => (
                                <SelectItem
                                  key={type.type_name}
                                  value={type.type_name}
                                >
                                  {type.type_name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {categoryID === 1 && (
                  <>
                    <FormField
                      control={form.control}
                      name="asset_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Asset Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Ex. TPLink"
                              {...field}
                              className="text-sm sm:text-base"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Location"
                              {...field}
                              className="text-sm sm:text-base"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          className="text-sm sm:text-base"
                          placeholder="Ex. Dell"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specifications</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="text-sm sm:text-base"
                          placeholder="Ex. RAM - 2GB"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="insurance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Insurance</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="text-sm sm:text-base"
                          placeholder="Ex. Provider: ABC"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="asset_amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="availability_status_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            {status.map((stat) => (
                              <SelectItem
                                key={stat.status_name}
                                value={stat.status_name}
                              >
                                {stat.status_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="purchase_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purchase Date</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal text-sm ",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4 text-[#737373]" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span className="text-[#737373]">
                                  Choose Date
                                </span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                if (!date) return;
                                const duration = differenceInDays(w, date);
                                form.setValue("warranty_duration", duration, {
                                  shouldValidate: true,
                                });
                                field.onChange(date);
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="warranty_due_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Warranty Due Date</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal text-sm ",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4 text-[#737373]" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span className="text-[#737373]">
                                  Warranty Due Date
                                </span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                if (!date) return;
                                const duration = differenceInDays(date, p);
                                form.setValue("warranty_duration", duration, {
                                  shouldValidate: true,
                                });
                                field.onChange(date);
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="warranty_duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Warranty Duration (in days)</FormLabel>
                      <FormControl>
                        <Input
                          disabled
                          type="number"
                          className="text-sm sm:text-base"
                          placeholder="Ex. 365"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Notes"
                          className="text-sm sm:text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <FormLabel htmlFor="picture">Picture</FormLabel>
                        <FormControl>
                          <Input
                            id="picture"
                            type="file"
                            accept="image/*"
                            onChange={(e) => onChange(e.target.files?.[0])}
                            {...rest}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2 flex justify-end align-end">
                <Button className="w-fit text-sm sm:text-base" type="submit">
                  Submit
                </Button>
              </div>
            </div>
            {/* 
                <FormField
                  control={form.control}
                  name="asset_condition_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Condition" />
                          </SelectTrigger>
                          <SelectContent>
                            {condition.map((con) => (
                              <SelectItem
                                key={con.asset_condition_name}
                                value={con.asset_condition_name}
                              >
                                {con.asset_condition_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                control={form.control}
                name="aging"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Aging"
                        {...field}
                        className="text-sm sm:text-base"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            */}
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AssetForm;
