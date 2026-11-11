"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Package, Plus, Trash2, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    shortDescription: "",
    brandId: "",
    status: "ACTIVE",
    isFeatured: false,
    isPublished: true,
    metaTitle: "",
    metaDescription: "",
  });

  // Variant State (At least one variant is required for pricing & stock in your schema)
  const [variants, setVariants] = useState([
    {
      name: "Default Variant",
      sku: "",
      price: "",
      compareAtPrice: "",
      stockQuantity: 10,
    },
  ]);

  // Image State
  const [images, setImages] = useState([{ url: "", altText: "" }]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));

    // Auto-generate slug from name if slug is untouched
    if (name === "name") {
      const generatedSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  };

  const handleVariantChange = (index: number, field: string, value: any) => {
    const updated = [...variants];
    updated[index][field as keyof typeof updated[number]] = value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([...variants, { name: "", sku: "", price: "", compareAtPrice: "", stockQuantity: 0 }]);
  };

  const removeVariant = (index: number) => {
    if (variants.length > 1) {
      setVariants(variants.filter((_, i) => i !== index));
    }
  };

  const handleImageChange = (index: number, field: string, value: string) => {
    const updated = [...images];
    updated[index][field as keyof typeof updated[number]] = value;
    setImages(updated);
  };

  const addImageField = () => {
    setImages([...images, { url: "", altText: "" }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        variants: variants.map((v) => ({
          ...v,
          price: parseFloat(v.price) || 0,
          compareAtPrice: v.compareAtPrice ? parseFloat(v.compareAtPrice) : null,
          stockQuantity: parseInt(String(v.stockQuantity), 10) || 0,
        })),
        images: images.filter((img) => img.url.trim() !== ""),
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create product");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/products"); // Adjust to your product listing dashboard route
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 transition-colors hover:text-[#006B3B]"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Products
          </Link>
          <h1 className="font-heading text-xl font-bold text-slate-900">Create New Product</h1>
        </div>

        {success && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 shadow-sm">
            <CheckCircle2 className="h-5 w-5 text-[#006B3B]" />
            <span className="text-sm font-semibold">Product created successfully! Redirecting...</span>
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 p-4 text-sm text-red-600 shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: General Details */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-base font-bold text-slate-900">General Information</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Wireless Bluetooth Headphones"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-[#006B3B] focus:bg-white focus:ring-1 focus:ring-[#006B3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. wireless-bluetooth-headphones"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-[#006B3B] focus:bg-white focus:ring-1 focus:ring-[#006B3B]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Short Description</label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  placeholder="A brief summary for product cards..."
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-[#006B3B] focus:bg-white focus:ring-1 focus:ring-[#006B3B]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Full Description</label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Detailed product specifications..."
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm text-slate-800 outline-none focus:border-[#006B3B] focus:bg-white focus:ring-1 focus:ring-[#006B3B]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Variants */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Pricing & Inventory Variants</h2>
              <button
                type="button"
                onClick={addVariant}
                className="inline-flex items-center gap-1 rounded-xl bg-[#006B3B]/10 px-3 py-1.5 text-xs font-semibold text-[#006B3B] transition-colors hover:bg-[#006B3B] hover:text-white"
              >
                <Plus className="h-3.5 w-3.5" /> Add Variant
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {variants.map((variant, idx) => (
                <div key={idx} className="relative grid grid-cols-1 gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 sm:grid-cols-5">
                  <div className="sm:col-span-1">
                    <label className="block text-[11px] font-semibold text-slate-500">Variant Name</label>
                    <input
                      type="text"
                      value={variant.name}
                      onChange={(e) => handleVariantChange(idx, "name", e.target.value)}
                      placeholder="e.g. Black / XL"
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs"
                      required
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-[11px] font-semibold text-slate-500">SKU</label>
                    <input
                      type="text"
                      value={variant.sku}
                      onChange={(e) => handleVariantChange(idx, "sku", e.target.value)}
                      placeholder="SKU-CODE"
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs"
                      required
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-[11px] font-semibold text-slate-500">Price (₦)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={variant.price}
                      onChange={(e) => handleVariantChange(idx, "price", e.target.value)}
                      placeholder="28500"
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs"
                      required
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-[11px] font-semibold text-slate-500">Stock Qty</label>
                    <input
                      type="number"
                      value={variant.stockQuantity}
                      onChange={(e) => handleVariantChange(idx, "stockQuantity", e.target.value)}
                      placeholder="10"
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs"
                      required
                    />
                  </div>

                  <div className="flex items-end justify-end sm:col-span-1">
                    {variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(idx)}
                        className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Product Images */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Product Images</h2>
              <button
                type="button"
                onClick={addImageField}
                className="inline-flex items-center gap-1 rounded-xl bg-[#006B3B]/10 px-3 py-1.5 text-xs font-semibold text-[#006B3B] transition-colors hover:bg-[#006B3B] hover:text-white"
              >
                <Plus className="h-3.5 w-3.5" /> Add Image URL
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {images.map((img, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="url"
                    value={img.url}
                    onChange={(e) => handleImageChange(idx, "url", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:bg-white focus:ring-1 focus:ring-[#006B3B]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#006B3B] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 transition-all hover:bg-emerald-700 active:scale-95 disabled:opacity-50"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Save & Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}