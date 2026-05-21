from rest_framework.pagination import (
    PageNumberPagination
)

from rest_framework.response import (
    Response
)

# =========================================
# CUSTOM PAGINATION
# =========================================

class LoanPagination(
    PageNumberPagination
):

    # =========================================
    # DEFAULT PAGE SIZE
    # =========================================

    page_size = 5

    # =========================================
    # CUSTOM QUERY PARAM
    # Example:
    # ?page_size=10
    # =========================================

    page_size_query_param = (
        "page_size"
    )

    # =========================================
    # MAX PAGE LIMIT
    # =========================================

    max_page_size = 100

    # =========================================
    # PAGE QUERY PARAM
    # Example:
    # ?page=2
    # =========================================

    page_query_param = "page"

    # =========================================
    # CUSTOM PAGINATED RESPONSE
    # =========================================

    def get_paginated_response(
        self,
        data
    ):

        return Response({

            "success": True,

            "pagination": {

                "current_page":
                    self.page.number,

                "total_pages":
                    self.page.paginator.num_pages,

                "page_size":
                    self.get_page_size(
                        self.request
                    ),

                "total_records":
                    self.page.paginator.count,

                "next":
                    self.get_next_link(),

                "previous":
                    self.get_previous_link()
            },

            "results": data
        })