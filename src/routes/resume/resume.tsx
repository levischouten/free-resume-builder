import React from "react";
import ResumeForm from "./_components/resume-form";
import { Template } from "./_components/template";
import { Button } from "@/components/ui/button";
import {
  DownloadIcon,
  FileJsonIcon,
  FileTextIcon,
  MoreVerticalIcon,
  Settings2Icon,
  XIcon,
} from "lucide-react";
import { useBreakpoint } from "@/lib/utils";
import { PDFPreview } from "@/components/shared/pdf-preview";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { debounce } from "lodash";
import { schema, Schema } from "./_utils/schemas";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const defaultValues: Schema = {
  sections: [
    {
      title: "Personal Details",
      type: "personalDetails",
      firstName: "",
      lastName: "",
      city: "",
      country: "",
      postalCode: "",
      drivingLicense: "",
      dateOfBirth: null,
      placeOfBirth: "",
      nationality: "",
      address: "",
      email: "",
      phone: "",
      summary: "",
      wantedJobTitle: "",
    },
    {
      title: "Skills",
      type: "skills",
      skills: [],
    },
    {
      title: "Educations",
      type: "educations",
      educations: [],
    },
    {
      title: "Employment History",
      type: "employmentHistory",
      employments: [],
    },
  ],
  settings: {
    font: "courier",
  },
};

export function Resume() {
  const [showPreview, setShowPreview] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);

  function exportJSON() {
    const blob = new Blob([JSON.stringify(formData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.json";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const isLargeScreen = useBreakpoint("lg");

  const createDefaultValues = React.useMemo(() => {
    let result = null;

    try {
      result = schema.parse(JSON.parse(localStorage.getItem("resume") || ""));
    } catch (error) {
      console.log({ error });
      result = defaultValues;
    }

    return result;
  }, []);

  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: createDefaultValues,
  });

  const formData = methods.watch();

  const autoSave = React.useRef(
    debounce((data: Schema) => {
      localStorage.setItem("resume", JSON.stringify(data));
    }, 1000)
  );

  React.useEffect(() => {
    autoSave.current(formData);
  }, [formData, autoSave]);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {(isLargeScreen || !showPreview) && (
        <div className="lg:flex-none flex-1 lg:basis-1/2 max-h-full lg:overflow-auto">
          <ResumeForm methods={methods} />
          <Button
            className="lg:hidden fixed right-8 bottom-8"
            onClick={() => setShowPreview(true)}
          >
            <FileTextIcon className="w-4 h-4 mr-2" /> Preview
          </Button>
        </div>
      )}
      {(isLargeScreen || showPreview) && (
        <div className="lg:relative h-full w-screen flex-none lg:basis-1/2 bg-muted">
          <div className="bg-primary text-white flex justify-between lg:hidden items-center p-2">
            <Button onClick={() => setShowSettings(true)} size="icon">
              <Settings2Icon className="w-5 h-5 mr-2" />
            </Button>
            <div className="mx-auto">
              <div className="flex gap-2">
                <PDFDownloadLink
                  document={<Template data={formData} />}
                  fileName="resume.pdf"
                >
                  <Button>
                    <DownloadIcon className="w-4 h-4 mr-2" /> Download PDF
                  </Button>
                </PDFDownloadLink>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon">
                      <MoreVerticalIcon className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={exportJSON}>
                      <FileJsonIcon className="w-4 h-4 mr-2" /> Export JSON
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <Button onClick={() => setShowPreview(false)} size="icon">
              <XIcon className="w-5 h-5 mr-2" />
            </Button>
          </div>
          <div className="overflow-hidden p-12 flex-1 space-y-12">
            <div className="hidden lg:flex justify-between max-w-2xl mx-auto">
              <Dialog open={showSettings} onOpenChange={setShowSettings}>
                <DialogTrigger asChild>
                  <Button variant="ghost">
                    <Settings2Icon className="w-4 h-4 mr-2" /> Template Settings
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Template Customization Settings</DialogTitle>
                    <DialogDescription>
                      Adjust the fonts, colors, and other visual elements to
                      personalize your template.
                    </DialogDescription>
                    <Form {...methods}>
                      <FormField
                        control={methods.control}
                        name="settings.font"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Font</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select which font to use" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="courier">Courier</SelectItem>
                                <SelectItem value="helvetica">
                                  Helvetica
                                </SelectItem>
                                <SelectItem value="times-roman">
                                  Times Roman
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </Form>
                  </DialogHeader>

                  <DialogFooter></DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="flex gap-2">
                <PDFDownloadLink
                  document={<Template data={formData} />}
                  fileName="resume.pdf"
                >
                  <Button>
                    <DownloadIcon className="w-4 h-4 mr-2" /> Download PDF
                  </Button>
                </PDFDownloadLink>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon">
                      <MoreVerticalIcon className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={exportJSON}>
                      <FileJsonIcon className="w-4 h-4 mr-2" /> Export JSON
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <PDFPreview>
              <Template data={formData} />
            </PDFPreview>
          </div>
        </div>
      )}
    </div>
  );
}
