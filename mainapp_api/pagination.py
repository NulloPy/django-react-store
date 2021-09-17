from rest_framework.pagination import PageNumberPagination


class CategoryProductsPagination(PageNumberPagination):

    page_size = 8
    page_query_param = 'page'
