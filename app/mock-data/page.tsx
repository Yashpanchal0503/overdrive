"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { PulseLoader } from "react-spinners"
import { LayoutGrid, LayoutList, Search, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type Product = {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export default function MockDataPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real app, this would be an API call
        // For demo purposes, we're simulating the data

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock products data
        const mockProducts: Product[] = [
          {
            id: 1,
            title: "iPhone 13",
            description: "The latest iPhone with A15 Bionic chip, Super Retina XDR display, and improved camera system",
            price: 999,
            discountPercentage: 10.5,
            rating: 4.7,
            stock: 45,
            brand: "Apple",
            category: "smartphones",
            thumbnail: "/placeholder.svg?height=200&width=200",
            images: ["/placeholder.svg?height=400&width=400"],
          },
          {
            id: 2,
            title: "Samsung Galaxy S21",
            description: "5G smartphone with 120Hz display, 8K video, and all-day battery life",
            price: 899,
            discountPercentage: 15,
            rating: 4.5,
            stock: 30,
            brand: "Samsung",
            category: "smartphones",
            thumbnail: "/placeholder.svg?height=200&width=200",
            images: ["/placeholder.svg?height=400&width=400"],
          },
          {
            id: 3,
            title: "MacBook Pro",
            description: "Apple M1 Pro chip, 16-inch Liquid Retina XDR display, and up to 21 hours of battery life",
            price: 1999,
            discountPercentage: 5,
            rating: 4.9,
            stock: 20,
            brand: "Apple",
            category: "laptops",
            thumbnail: "/placeholder.svg?height=200&width=200",
            images: ["/placeholder.svg?height=400&width=400"],
          },
          {
            id: 4,
            title: "Dell XPS 15",
            description: "15.6-inch 4K UHD display, 11th Gen Intel Core processors, and NVIDIA GeForce graphics",
            price: 1599,
            discountPercentage: 8,
            rating: 4.6,
            stock: 25,
            brand: "Dell",
            category: "laptops",
            thumbnail: "/placeholder.svg?height=200&width=200",
            images: ["/placeholder.svg?height=400&width=400"],
          },
          {
            id: 5,
            title: "Sony WH-1000XM4",
            description: "Industry-leading noise canceling wireless headphones with exceptional sound quality",
            price: 349,
            discountPercentage: 12,
            rating: 4.8,
            stock: 50,
            brand: "Sony",
            category: "headphones",
            thumbnail: "/placeholder.svg?height=200&width=200",
            images: ["/placeholder.svg?height=400&width=400"],
          },
          {
            id: 6,
            title: "iPad Pro",
            description: "M1 chip, Liquid Retina XDR display, and Thunderbolt support",
            price: 799,
            discountPercentage: 7,
            rating: 4.7,
            stock: 35,
            brand: "Apple",
            category: "tablets",
            thumbnail: "/placeholder.svg?height=200&width=200",
            images: ["/placeholder.svg?height=400&width=400"],
          },
          {
            id: 7,
            title: "Logitech MX Master 3",
            description: "Advanced wireless mouse with ultrafast scrolling and app-specific customizations",
            price: 99,
            discountPercentage: 5,
            rating: 4.6,
            stock: 60,
            brand: "Logitech",
            category: "peripherals",
            thumbnail: "/placeholder.svg?height=200&width=200",
            images: ["/placeholder.svg?height=400&width=400"],
          },
          {
            id: 8,
            title: "Samsung QLED TV",
            description: "4K Smart TV with Quantum Processor and Alexa built-in",
            price: 1299,
            discountPercentage: 20,
            rating: 4.5,
            stock: 15,
            brand: "Samsung",
            category: "televisions",
            thumbnail: "/placeholder.svg?height=200&width=200",
            images: ["/placeholder.svg?height=400&width=400"],
          },
        ]

        setProducts(mockProducts)
        setFilteredProducts(mockProducts)
      } catch (error) {
        toast.error("Error fetching product data")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredProducts(filtered)
    }
  }, [searchTerm, products])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already handled by the useEffect
    toast.success(`Searching for: ${searchTerm}`)
  }

  const calculateDiscountedPrice = (price: number, discountPercentage: number) => {
    return ((price * (100 - discountPercentage)) / 100).toFixed(2)
  }

  if (loading) {
    return (
      <div className="container py-12 flex justify-center">
        <PulseLoader color="#6366F1" size={12} />
      </div>
    )
  }

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">Mock Data</h1>

      <Card>
        <CardHeader>
          <CardTitle>Product Catalog</CardTitle>
          <CardDescription>Browse our collection of products from Dummy JSON API</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit">
              <Search className="h-4 w-4" />
            </Button>
          </form>

          <Tabs defaultValue="grid">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-muted-foreground">{filteredProducts.length} products found</div>
              <TabsList>
                <TabsTrigger value="grid">
                  <LayoutGrid className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="list">
                  <LayoutList className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      <img
                        src={product.thumbnail || "/placeholder.svg"}
                        alt={product.title}
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                      {product.discountPercentage > 0 && (
                        <Badge className="absolute top-2 right-2 bg-red-500">{product.discountPercentage}% OFF</Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium truncate">{product.title}</h3>
                        <Badge variant="outline">{product.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          {product.discountPercentage > 0 ? (
                            <div className="flex items-baseline gap-1">
                              <span className="font-bold">
                                ${calculateDiscountedPrice(product.price, product.discountPercentage)}
                              </span>
                              <span className="text-sm text-muted-foreground line-through">${product.price}</span>
                            </div>
                          ) : (
                            <span className="font-bold">${product.price}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-yellow-500">★</span>
                          <span>{product.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full" size="sm">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list">
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id}>
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-48 h-48 bg-muted">
                        <img
                          src={product.thumbnail || "/placeholder.svg"}
                          alt={product.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{product.title}</h3>
                            <p className="text-sm text-muted-foreground">{product.brand}</p>
                          </div>
                          <Badge variant="outline">{product.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <div>
                            {product.discountPercentage > 0 ? (
                              <div className="flex items-baseline gap-1">
                                <span className="font-bold">
                                  ${calculateDiscountedPrice(product.price, product.discountPercentage)}
                                </span>
                                <span className="text-sm text-muted-foreground line-through">${product.price}</span>
                              </div>
                            ) : (
                              <span className="font-bold">${product.price}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-sm">
                              <span className="text-yellow-500">★</span>
                              <span>{product.rating}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">Stock: {product.stock}</div>
                          </div>
                        </div>
                        <Button className="mt-4" size="sm">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </div>
  )
}
