import { PackageOpen } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Service {
  title: string;
  description: string;
  content: string;
  footer: string;
}

interface ServiceListProps {
  currentServices: Service[];
}

const ServiceList: React.FC<ServiceListProps> = ({ currentServices }) => {
  if (currentServices.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center text-center text-lg text-gray-500">
        <PackageOpen className="w-36 h-36" />
        <p className="mt-2">No results found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
      {currentServices.map((service, index) => (
        <Card
          key={index}
          className="shadow-md hover:shadow-lg transition-shadow"
        >
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {service.title}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {service.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{service.content}</p>
          </CardContent>
          <CardFooter>
            <p className="font-medium text-primary">{service.footer}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ServiceList;
