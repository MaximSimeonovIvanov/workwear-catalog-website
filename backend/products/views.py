from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Category, Brand, Tag, Product, StoreInfo
from .serializers import (
    CategorySerializer, BrandSerializer, TagSerializer,
    ProductListSerializer, ProductDetailSerializer, StoreInfoSerializer
)


class CategoryListView(generics.ListAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.filter(parent=None).prefetch_related('children')


class BrandListView(generics.ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer


class TagListView(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class ProductListView(generics.ListAPIView):
    serializer_class = ProductListSerializer

    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True).select_related(
            'category', 'brand'
        ).prefetch_related('tags', 'images')

        category = self.request.query_params.get('category')
        brand = self.request.query_params.get('brand')
        tag = self.request.query_params.get('tag')
        featured = self.request.query_params.get('featured')
        search = self.request.query_params.get('search')

        if category:
            queryset = queryset.filter(category__slug=category)
        if brand:
            queryset = queryset.filter(brand__slug=brand)
        if tag:
            queryset = queryset.filter(tags__slug=tag)
        if featured:
            queryset = queryset.filter(is_featured=True)
        if search:
            queryset = queryset.filter(name__icontains=search)

        return queryset


class ProductDetailView(generics.RetrieveAPIView):
    serializer_class = ProductDetailSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return Product.objects.filter(is_active=True).select_related(
            'category', 'brand'
        ).prefetch_related('tags', 'images', 'variants')


class StoreInfoView(APIView):
    def get(self, request):
        store = StoreInfo.objects.first()
        if not store:
            return Response({})
        serializer = StoreInfoSerializer(store)
        return Response(serializer.data)
