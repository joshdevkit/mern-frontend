import { Loader, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import http from "@/lib/utils";
import { Services } from "@/types.d";
import { toast } from "sonner";

const CreateServiceButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [open, setOpen] = useState(false);
  const [serviceData, setServiceData] = useState<Services>({
    title: "",
    description: "",
    content: "",
    footer: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setServiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await http.post(
        "/users/admin/create-service",
        serviceData
      );
      console.log(response);

      if (response.data.success) {
        setServiceData({
          title: "",
          description: "",
          content: "",
          footer: "",
        });
        setOpen(false);
        toast.success(response.data.message);
        setLoading(false);
      }
    } catch (error: any) {
      const errorData = error?.response?.data?.error?.errors;

      if (errorData) {
        Object.keys(errorData).forEach((key) => {
          const message = errorData[key]?.message;
          if (message) {
            toast.warning(`${message}`, {
              duration: 3000,
            });
          }
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <div className="mr-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            <span>Create Service</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Create New Service</DialogTitle>
            <DialogDescription>
              Fill in the details of the new service.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={serviceData.title}
                onChange={handleChange}
                disabled={loadingState}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={serviceData.description}
                onChange={handleChange}
                disabled={loadingState}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Content
              </Label>
              <Textarea
                id="content"
                name="content"
                value={serviceData.content}
                onChange={handleChange}
                disabled={loadingState}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="footer" className="text-right">
                Footer
              </Label>
              <Textarea
                id="footer"
                name="footer"
                value={serviceData.footer}
                onChange={handleChange}
                disabled={loadingState}
                className="col-span-3"
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader className="animate-spin" size={20} />
                ) : (
                  "Save Service"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateServiceButton;
