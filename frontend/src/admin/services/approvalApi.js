import { api } from "../../services/api";

export const approvalApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getApprovals: builder.query({
      query: ({ page = 1, page_size = 20 } = {}) =>
        `approval_engine/?page=${page}&page_size=${page_size}`,
      providesTags: (res) =>
        res?.results
          ? [
              { type: "Approval", id: "LIST" },
              ...res.results.map((x) => ({ type: "Approval", id: x.id })),
            ]
          : [{ type: "Approval", id: "LIST" }],
    }),

    getApproval: builder.query({
      query: (id) => `approval_engine/${id}/`,
      providesTags: (res, err, id) => [{ type: "Approval", id }],
    }),

    getApprovalByEntity: builder.query({
      query: ({ entity_type, entity_id }) =>
        `approval_engine/by-entity/?entity_type=${encodeURIComponent(
          entity_type
        )}&entity_id=${encodeURIComponent(entity_id)}`,
      providesTags: (res) => (res?.id ? [{ type: "Approval", id: res.id }] : []),
    }),

    submitApproval: builder.mutation({
      query: (body) => ({
        url: `approval_engine/submit/`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Approval", id: "LIST" }],
    }),

    commentApproval: builder.mutation({
      query: ({ id, comment }) => ({
        url: `approval_engine/${id}/comment/`,
        method: "POST",
        body: { comment },
      }),
      invalidatesTags: (res, err, { id }) => [
        { type: "Approval", id },
        { type: "Approval", id: "LIST" },
      ],
    }),

    approveApproval: builder.mutation({
      query: ({ id, comment }) => ({
        url: `approval_engine/${id}/approve/`,
        method: "POST",
        body: { comment },
      }),
      invalidatesTags: (res, err, { id }) => [
        { type: "Approval", id },
        { type: "Approval", id: "LIST" },
      ],
    }),

    rejectApproval: builder.mutation({
      query: ({ id, comment }) => ({
        url: `approval_engine/${id}/reject/`,
        method: "POST",
        body: { comment },
      }),
      invalidatesTags: (res, err, { id }) => [
        { type: "Approval", id },
        { type: "Approval", id: "LIST" },
      ],
    }),

    resubmitApproval: builder.mutation({
      query: ({ id, comment }) => ({
        url: `approval_engine/${id}/resubmit/`,
        method: "POST",
        body: { comment },
      }),
      invalidatesTags: (res, err, { id }) => [
        { type: "Approval", id },
        { type: "Approval", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetApprovalsQuery,
  useGetApprovalQuery,
  useGetApprovalByEntityQuery,
  useSubmitApprovalMutation,
  useCommentApprovalMutation,
  useApproveApprovalMutation,
  useRejectApprovalMutation,
  useResubmitApprovalMutation,
} = approvalApi;
