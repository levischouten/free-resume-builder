import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Wand2Icon, FileJsonIcon } from "lucide-react";
import { Schema, schema } from "../_utils/schemas";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function ImportJSON() {
  const [file, setFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [json, setJson] = React.useState<Schema | null>(null);

  const [showDialog, setShowDialog] = React.useState<boolean>();
  const [showAlert, setShowAlert] = React.useState<boolean>();

  function handleConfirm() {
    localStorage.setItem("resume", JSON.stringify(json));
    window.location.reload();
  }

  async function handleSubmit() {
    if (!file) {
      setError("Please select a file");
      return;
    }

    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (evt) => {
      try {
        const json = JSON.parse(evt.target?.result as string);
        const parsedData = schema.parse(json);

        setJson(parsedData);
        setShowAlert(true);
      } catch (error) {
        setError("Invalid JSON format");
      }
    };
    reader.onerror = () => {
      setError("Error reading file");
    };
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) setFile(file);
  }

  function handleClose() {
    setShowDialog(false);
    setFile(null);
    setError(null);
    setJson(null);
  }

  return (
    <Dialog onOpenChange={setShowDialog} open={showDialog}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="self-end">
            <Wand2Icon className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <FileJsonIcon className="w-4 h-4 mr-2" /> Import JSON
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import JSON File</DialogTitle>
          <DialogDescription>
            Upload a JSON file which matches the schema of this form.
          </DialogDescription>
        </DialogHeader>
        <Label htmlFor="input">JSON File</Label>
        <Input id="input" type="file" accept=".json" onChange={handleChange} />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Confirm</Button>
          <AlertDialog onOpenChange={setShowAlert} open={showAlert}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently overwrite
                  your current resume.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirm}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
