import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Textarea } from "@/components/ui/textarea";
import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const formSchema = z.object({
  department: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  issue: z.string().min(2).max(100),
  remarks: z.string().min(2).max(100),
  urgencyLevel: z.string().min(2).max(100),
});

function IssuanceForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      department: "",
      name: "",
      issue: "",
      remarks: "",
      urgencyLevel: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-10">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Deparment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Department 1">
                            Department 1
                          </SelectItem>
                          <SelectItem value="Department 1">
                            Department 2
                          </SelectItem>
                          <SelectItem value="Department 1">
                            Department 3
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requester Name</FormLabel>
                    <FormControl>
                      <Input
                        type="name"
                        placeholder="Requester Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="">
            <FormField
              control={form.control}
              name="issue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issue</FormLabel>
                  <FormControl>
                    <Input type="issue" placeholder="Issue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="">
            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Type your remarks here."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
<div className="flex gap-10">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Reported</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Date Reported</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
              <FormField
                control={form.control}
                name="urgencyLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Urgency Level</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Urgency Level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Urgent">
                            Urgent
                          </SelectItem>
                          <SelectItem value="Department 1">
                            Department 2
                          </SelectItem>
                          <SelectItem value="Department 1">
                            Department 3
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default IssuanceForm;
