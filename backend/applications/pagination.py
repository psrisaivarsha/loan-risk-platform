from rest_framework.pagination import (
    PageNumberPagination
)

# =========================================
# CUSTOM PAGINATION
# =========================================

class LoanPagination(
    PageNumberPagination
):

    # ITEMS PER PAGE

    page_size = 5

    # OPTIONAL QUERY PARAM

    page_size_query_param = (
        "page_size"
    )

    # MAX LIMIT

    max_page_size = 100