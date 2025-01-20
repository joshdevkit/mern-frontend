"use client";
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import HeaderBreadCrumb from "@/components/header-breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import Title from "@/components/Title";

import SearchInput from "@/components/services-components/SearchInput";
import CreateServiceButton from "@/components/services-components/CreateServiceButton";
import ServiceList from "@/components/services-components/ServiceList";
import PaginationControls from "@/components/services-components/PaginationControls";
import type { Services } from "@/types.d";

export default function Services() {
  const services: Services[] = [
    {
      title: "Teeth Whitening",
      description: "Brighten your smile",
      content:
        "Our professional teeth whitening service removes stains and discoloration for a radiant smile.",
      footer: "₱6,000 – ₱20,000 per session",
    },
    {
      title: "Dental Implants",
      description: "Permanent tooth replacement",
      content:
        "Get durable and natural-looking dental implants to restore your confidence and oral function.",
      footer: "Consultation required",
    },
    {
      title: "Orthodontics",
      description: "Straighten your teeth",
      content:
        "We offer braces and Invisalign treatments to help align your teeth for a perfect smile.",
      footer: "₱ 30,000 to ₱ 300,000",
    },
    {
      title: "Routine Checkups",
      description: "Maintain your oral health",
      content:
        "Regular dental checkups to ensure your teeth and gums stay healthy. Includes cleaning and exams.",
      footer: "₱1,000 - ₱3,000",
    },
    {
      title: "Root Canal Treatment",
      description: "Save your tooth",
      content:
        "Our root canal therapy removes infection and restores the health of your damaged tooth.",
      footer: "₱6,000 and ₱30,000 per tooth",
    },
    {
      title: "Pediatric Dentistry",
      description: "Dental care for kids",
      content:
        "Gentle and friendly dental services for children to ensure their oral health from a young age.",
      footer: "Consultation required",
    },
  ];

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(3);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentServices = filteredServices.slice(
    (currentPage - 1) * totalPages,
    currentPage * totalPages
  );

  return (
    <>
      <Title description="Admin - service offered, Dental services, dental health care concern.">
        Admin - Dental Services
      </Title>
      <SidebarProvider>
        <AdminLayout />
        <SidebarInset>
          <HeaderBreadCrumb
            pageTitle="Dental Services"
            subTitle="Admin Services"
          />
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
              <div className="flex items-center justify-between mb-4">
                <SearchInput
                  searchQuery={searchQuery}
                  placeholder="Search services..."
                  handleSearchChange={handleSearchChange}
                />
                <CreateServiceButton />
              </div>

              <ServiceList currentServices={currentServices} />
              <PaginationControls
                currentPage={currentPage}
                totalPages={Math.ceil(filteredServices.length / totalPages)}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
