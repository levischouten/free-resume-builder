import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Collapsible } from "@/components/ui/collapsible";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import React from "react";
import {
  UseFieldArrayRemove,
  UseFormReturn,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import {
  ChevronsUpDownIcon,
  GlobeIcon,
  HelpCircleIcon,
  MoreVerticalIcon,
  PencilRulerIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TextEditor } from "@/components/ui/text-editor";
import { DatePicker } from "@/components/ui/date-picker";
import { MonthPicker } from "@/components/ui/month-picker";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Schema } from "../_utils/schemas";
import { ImportJSON } from "./import-json";

const SECTIONS = {
  personalDetails: PersonalDetails,
  skills: Skills,
  educations: Educations,
  employmentHistory: EmploymentHistory,
  languages: Languages,
};

type SectionProps = {
  index: number;
  remove: UseFieldArrayRemove;
};

/**
 * Components for all possible sections of the resume
 */

function PersonalDetails(props: SectionProps) {
  const methods = useFormContext<Schema>();

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-xl font-medium">
        {methods.watch(`sections.${props.index}.title`)}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
        <FormField
          control={methods.control}
          name={`sections.${props.index}.firstName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name={`sections.${props.index}.lastName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name={`sections.${props.index}.email`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name={`sections.${props.index}.phone`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name={`sections.${props.index}.country`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="Country" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name={`sections.${props.index}.city`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="space-x-2">
            <span>Edit additional details</span>
            <ChevronsUpDownIcon className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
            <FormField
              control={methods.control}
              name={`sections.${props.index}.address`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name={`sections.${props.index}.postalCode`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Postal Code" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name={`sections.${props.index}.drivingLicense`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Driving License</FormLabel>
                  <FormControl>
                    <Input placeholder="Driving License" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name={`sections.${props.index}.nationality`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality</FormLabel>
                  <FormControl>
                    <Input placeholder="Nationality" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name={`sections.${props.index}.placeOfBirth`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place of Birth</FormLabel>
                  <FormControl>
                    <Input placeholder="Place of Birth" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name={`sections.${props.index}.dateOfBirth`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <DatePicker
                      setSelectedDate={field.onChange}
                      selectedDate={field.value ?? undefined}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      <FormField
        control={methods.control}
        name={`sections.${props.index}.summary`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Summary</FormLabel>
            <FormControl>
              <TextEditor
                onChange={field.onChange}
                defaultValue={field.value}
                placeholder="Summarize your qualifications and strengths in 2-3 sentences."
              />
            </FormControl>
          </FormItem>
        )}
      />
    </section>
  );
}

function Skills(props: SectionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const methods = useFormContext<Schema>();

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: `sections.${props.index}.skills`,
  });

  function createSkill() {
    append({ level: "novice", name: "" });
    setOpenIndex(fields.length);
  }

  return (
    <section className="flex flex-col gap-8">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-medium">
            {methods.watch(`sections.${props.index}.title`)}
          </h3>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="ghost">
                <Trash2Icon className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Would you like to delete this section?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This section will be permanently
                  removed from your resume.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => props.remove(props.index)}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <p className="text-sm text-muted-foreground">
          Select 5 relevant skills that align with the job requirements. Ensure
          they resonate with the key skills highlighted in the job post,
          especially for online applications.
        </p>
      </div>
      {fields.length > 0 && (
        <div className="flex flex-col gap-4">
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="flex items-center gap-2">
                <Dialog defaultOpen={index === openIndex}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex flex-1 flex-col h-auto items-start"
                    >
                      <span>
                        {methods.watch(
                          `sections.${props.index}.skills.${index}.name`
                        ) || "(Not specified)"}
                      </span>
                      <span className="text-muted-foreground font-normal capitalize text-sm">
                        {methods.watch(
                          `sections.${props.index}.skills.${index}.level`
                        )}
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit skill</DialogTitle>
                      <DialogDescription>
                        {methods.watch(
                          `sections.${props.index}.skills.${index}.name`
                        ) || "(Not specified)"}
                      </DialogDescription>
                    </DialogHeader>
                    <FormField
                      control={methods.control}
                      name={`sections.${props.index}.skills.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Name" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={methods.control}
                      name={`sections.${props.index}.skills.${index}.level`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Level -{" "}
                            <span className="text-muted-foreground font-normal capitalize">
                              {methods.watch(
                                `sections.${props.index}.skills.${index}.level`
                              )}
                            </span>
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-row"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="novice"
                                    className={cn({
                                      "bg-primary": [
                                        "novice",
                                        "beginner",
                                        "intermediate",
                                        "advanced",
                                        "expert",
                                      ].includes(field.value),
                                    })}
                                  />
                                </FormControl>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="beginner"
                                    className={cn({
                                      "bg-primary": [
                                        "beginner",
                                        "intermediate",
                                        "advanced",
                                        "expert",
                                      ].includes(field.value),
                                    })}
                                  />
                                </FormControl>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="intermediate"
                                    className={cn({
                                      "bg-primary": [
                                        "intermediate",
                                        "advanced",
                                        "expert",
                                      ].includes(field.value),
                                    })}
                                  />
                                </FormControl>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="advanced"
                                    className={cn({
                                      "bg-primary": [
                                        "advanced",
                                        "expert",
                                      ].includes(field.value),
                                    })}
                                  />
                                </FormControl>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="expert"
                                    className={cn({
                                      "bg-primary": ["expert"].includes(
                                        field.value
                                      ),
                                    })}
                                  />
                                </FormControl>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </DialogContent>
                </Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost" type="button">
                      <MoreVerticalIcon className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Trash2Icon className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Would you like to remove this skill?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. The skill &nbsp;
                            <span>
                              {methods.watch(
                                `sections.${props.index}.skills.${index}.name`
                              ) || "(Not specified)"}
                            </span>
                            &nbsp; will be permanently removed from your resume.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => remove(index)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })}
        </div>
      )}

      <Button
        variant="ghost"
        type="button"
        className="justify-start"
        onClick={createSkill}
      >
        <PlusIcon className="w-4 h-4 mr-2" /> Add more skills
      </Button>
    </section>
  );
}

function Educations(props: SectionProps) {
  const methods = useFormContext<Schema>();

  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const { fields, remove, append } = useFieldArray({
    control: methods.control,
    name: `sections.${props.index}.educations`,
  });

  function school(index: number) {
    return methods.watch(`sections.${props.index}.educations.${index}.school`);
  }

  function degree(index: number) {
    return methods.watch(`sections.${props.index}.educations.${index}.degree`);
  }

  function startDate(index: number) {
    const date = methods.watch(
      `sections.${props.index}.educations.${index}.startDate`
    );

    if (!date) {
      return null;
    }

    return format(date, "MMM yyyy");
  }

  function endDate(index: number) {
    const date = methods.watch(
      `sections.${props.index}.educations.${index}.endDate`
    );

    if (!date) {
      return null;
    }

    return format(date, "MMM yyyy");
  }

  function createEducation() {
    append({
      degree: "",
      school: "",
      startDate: null,
      endDate: null,
      description: "",
    });

    setOpenIndex(fields.length);
  }

  return (
    <section className="flex flex-col gap-8">
      <div>
        <h3 className="text-xl font-medium">
          {methods.watch(`sections.${props.index}.title`)}
        </h3>
        <p className="text-sm text-muted-foreground">
          A diverse educational background on your resume underscores the unique
          value and perspective you bring to a position.
        </p>
      </div>
      {fields.length > 0 && (
        <div className="flex flex-col gap-4">
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="flex items-center gap-2">
                <Dialog defaultOpen={index === openIndex}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex flex-1 flex-col h-auto items-start"
                    >
                      <span>
                        {degree(index) || "(Not specified)"}&nbsp;
                        {degree(index) &&
                          school(index) &&
                          `at ${school(index)}`}
                      </span>
                      <span className="text-muted-foreground font-normal capitalize text-sm">
                        {startDate(index) && endDate(index)
                          ? `${startDate(index)} - ${endDate(index)}`
                          : "June 2022 - Present"}
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="">
                    <DialogHeader>
                      <DialogTitle>Edit education</DialogTitle>
                      <DialogDescription>
                        {degree(index) || "(Not specified)"}&nbsp;
                        {degree(index) &&
                          school(index) &&
                          `at ${school(index)}`}
                      </DialogDescription>
                    </DialogHeader>
                    <FormField
                      control={methods.control}
                      name={`sections.${props.index}.educations.${index}.school`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>School</FormLabel>
                          <FormControl>
                            <Input placeholder="School" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={methods.control}
                      name={`sections.${props.index}.educations.${index}.degree`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Degree</FormLabel>
                          <FormControl>
                            <Input placeholder="Degree" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={methods.control}
                        name={`sections.${props.index}.educations.${index}.startDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                              <MonthPicker
                                onChange={field.onChange}
                                value={field.value}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={methods.control}
                        name={`sections.${props.index}.educations.${index}.endDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                              <MonthPicker
                                onChange={field.onChange}
                                value={field.value}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={methods.control}
                      name={`sections.${props.index}.educations.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <TextEditor
                              onChange={field.onChange}
                              defaultValue={field.value}
                              placeholder="Bachelor of Science in Computer Engineering."
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </DialogContent>
                </Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost" type="button">
                      <MoreVerticalIcon className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Trash2Icon className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Would you like to remove this education?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. The education &nbsp;
                            <span>
                              {methods.watch(
                                `sections.${props.index}.educations.${index}.degree`
                              ) || "(Not specified)"}
                            </span>
                            &nbsp; will be permanently removed from your resume.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => remove(index)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })}
        </div>
      )}

      <Button
        variant="ghost"
        type="button"
        onClick={createEducation}
        className="justify-start"
      >
        <PlusIcon className="w-4 h-4 mr-2" /> Add more educations
      </Button>
    </section>
  );
}

function EmploymentHistory(props: SectionProps) {
  const methods = useFormContext<Schema>();

  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: `sections.${props.index}.employments`,
  });

  function jobTitle(index: number) {
    return methods.watch(
      `sections.${props.index}.employments.${index}.jobTitle`
    );
  }

  function company(index: number) {
    return methods.watch(
      `sections.${props.index}.employments.${index}.company`
    );
  }

  function startDate(index: number) {
    const date = methods.watch(
      `sections.${props.index}.employments.${index}.startDate`
    );

    if (!date) {
      return null;
    }

    return format(date, "MMM yyyy");
  }

  function endDate(index: number) {
    const date = methods.watch(
      `sections.${props.index}.employments.${index}.endDate`
    );

    if (!date) {
      return null;
    }

    return format(date, "MMM yyyy");
  }

  function createEmployment() {
    append({
      company: "",
      jobTitle: "",
      startDate: null,
      endDate: null,
      description: "",
    });
    setOpenIndex(fields.length);
  }

  return (
    <section className="flex flex-col gap-8">
      <div>
        <h3 className="text-xl font-medium">
          {methods.watch(`sections.${props.index}.title`)}
        </h3>
        <p className="text-sm text-muted-foreground">
          A varied work history on your resume highlights the distinct expertise
          and insights you offer to a role.
        </p>
      </div>
      {fields.length > 0 && (
        <div className="flex flex-col gap-4">
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="flex items-center gap-2">
                <Dialog defaultOpen={index === openIndex}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex flex-1 flex-col h-auto items-start"
                    >
                      <span>
                        {jobTitle(index) || "(Not specified)"}&nbsp;
                        {jobTitle(index) &&
                          company(index) &&
                          `at ${company(index)}`}
                      </span>
                      <span className="text-muted-foreground font-normal capitalize text-sm">
                        {startDate(index) && endDate(index)
                          ? `${startDate(index)} - ${endDate(index)}`
                          : "June 2022 - Present"}
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="">
                    <DialogHeader>
                      <DialogTitle>Edit employment</DialogTitle>
                      <DialogDescription>
                        {jobTitle(index) || "(Not specified)"}&nbsp;
                        {jobTitle(index) &&
                          company(index) &&
                          `at ${company(index)}`}
                      </DialogDescription>
                    </DialogHeader>
                    <FormField
                      control={methods.control}
                      name={`sections.${props.index}.employments.${index}.jobTitle`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Job Title" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={methods.control}
                      name={`sections.${props.index}.employments.${index}.company`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Company" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={methods.control}
                        name={`sections.${props.index}.employments.${index}.startDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                              <MonthPicker
                                onChange={field.onChange}
                                value={field.value}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={methods.control}
                        name={`sections.${props.index}.employments.${index}.endDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                              <MonthPicker
                                onChange={field.onChange}
                                value={field.value}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={methods.control}
                      name={`sections.${props.index}.employments.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <TextEditor
                              onChange={field.onChange}
                              defaultValue={field.value}
                              placeholder="Managed team projects, coordinated client meetings, and analyzed sales data."
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </DialogContent>
                </Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost" type="button">
                      <MoreVerticalIcon className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Trash2Icon className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Would you like to remove this employment?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. The employment &nbsp;
                            <span>
                              {methods.watch(
                                `sections.${props.index}.employments.${index}.jobTitle`
                              ) || "(Not specified)"}
                            </span>
                            &nbsp; will be permanently removed from your resume.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => remove(index)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })}
        </div>
      )}

      <Button
        variant="ghost"
        type="button"
        onClick={createEmployment}
        className="justify-start"
      >
        <PlusIcon className="w-4 h-4 mr-2" /> Add more employments
      </Button>
    </section>
  );
}

function Languages(props: SectionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const methods = useFormContext<Schema>();

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: `sections.${props.index}.languages`,
  });

  function createLanguage() {
    append({ level: "basic", name: "" });
    setOpenIndex(fields.length);
  }

  return (
    <section className="flex flex-col gap-8">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-medium">
            {methods.watch(`sections.${props.index}.title`)}
          </h3>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="ghost">
                <Trash2Icon className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Would you like to delete this section?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This section will be permanently
                  removed from your resume.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => props.remove(props.index)}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <p className="text-sm text-muted-foreground">
          List the languages you are proficient in, both spoken and written.
          Highlight any languages that are particularly relevant to the job you
          are applying for.
        </p>
      </div>
      {fields.length > 0 && (
        <div className="flex flex-col gap-4">
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="flex items-center gap-2">
                <Dialog defaultOpen={index === openIndex}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex flex-1 flex-col h-auto items-start"
                    >
                      <span>
                        {methods.watch(
                          `sections.${props.index}.languages.${index}.name`
                        ) || "(Not specified)"}
                      </span>
                      <span className="text-muted-foreground font-normal capitalize text-sm">
                        {methods.watch(
                          `sections.${props.index}.languages.${index}.level`
                        )}
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit language</DialogTitle>
                      <DialogDescription>
                        {methods.watch(
                          `sections.${props.index}.languages.${index}.name`
                        ) || "(Not specified)"}
                      </DialogDescription>
                    </DialogHeader>
                    <FormField
                      control={methods.control}
                      name={`sections.${props.index}.languages.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Name" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={methods.control}
                      name={`sections.${props.index}.languages.${index}.level`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Level -{" "}
                            <span className="text-muted-foreground font-normal capitalize">
                              {methods.watch(
                                `sections.${props.index}.languages.${index}.level`
                              )}
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a verified email to display" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="native">Native</SelectItem>
                                <SelectItem value="fluent">Fluent</SelectItem>
                                <SelectItem value="intermediate">
                                  Intermediate
                                </SelectItem>
                                <SelectItem value="basic">Basic</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </DialogContent>
                </Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost" type="button">
                      <MoreVerticalIcon className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Trash2Icon className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Would you like to remove this language?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. The language &nbsp;
                            <span>
                              {methods.watch(
                                `sections.${props.index}.languages.${index}.name`
                              ) || "(Not specified)"}
                            </span>
                            &nbsp; will be permanently removed from your resume.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => remove(index)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })}
        </div>
      )}

      <Button
        variant="ghost"
        type="button"
        className="justify-start"
        onClick={createLanguage}
      >
        <PlusIcon className="w-4 h-4 mr-2" /> Add more languages
      </Button>
    </section>
  );
}

type ResumeFormProps = {
  methods: UseFormReturn<Schema>;
};

export default function ResumeForm(props: ResumeFormProps) {
  const { methods } = props;

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "sections",
  });

  return (
    <div className="px-6 py-8 sm:px-12 flex flex-col">
      <div className="self-end">
        <ImportJSON />
        <Dialog defaultOpen={false}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <HelpCircleIcon className="w-5 h-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Welcome to Your Instant, Free Resume Builder!
              </DialogTitle>
            </DialogHeader>
            <p>
              Free to use, no sign-up or payment required. Complete the form and
              download instantly!
            </p>
            <p>
              We never store any of your data on our servers, everything is
              saved locally in{" "}
              <a
                className="text-blue-500 underline"
                href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
              >
                Local storage
              </a>{" "}
              which can only be accessed by you.
            </p>
            <p>
              If you would like to keep your resume somewhere safe, you can
              download it as a JSON file and upload it again later by clicking
              the magic wand.
            </p>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="default">
                  Get Started
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Form {...methods}>
        <form className="flex flex-col gap-12">
          {fields.map((field, index) => {
            const Section = SECTIONS[field.type];
            return <Section index={index} key={field.id} remove={remove} />;
          })}
          <section className="flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-medium">Add sections</h3>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                type="button"
                size="lg"
                onClick={() =>
                  append({
                    type: "skills",
                    skills: [],
                    title: "Skills",
                  })
                }
              >
                <PencilRulerIcon className="w-4 h-4 mr-2" />
                Skills
              </Button>
              <Button
                variant="outline"
                type="button"
                size="lg"
                disabled={fields.some((field) => field.type === "languages")}
                onClick={() =>
                  append({
                    type: "languages",
                    languages: [],
                    title: "Languages",
                  })
                }
              >
                <GlobeIcon className="w-4 h-4 mr-2" />
                Languages
              </Button>
            </div>
          </section>
        </form>
      </Form>
    </div>
  );
}
