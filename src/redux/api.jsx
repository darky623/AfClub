import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useRouter } from "next/router";
const router = useRouter();
const currentUrl = router.asPath;

const apiUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL_PROD
    : process.env.NEXT_PUBLIC_API_URL_DEV;
console.log(
  currentUrl === "af-dev-stend.vercel.app"
    ? "https://test.alexfedorov.pro:8443/api"
    : "https://callback4bot.alexfedorov.pro:8443/api"
);
console.log(process.env.NODE_ENV);
console.log(process.env.NEXT_PUBLIC_API_URL_PROD);
console.log(process.env.NEXT_PUBLIC_API_URL_DEV);

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  endpoints: (builder) => ({
    getLogin: builder.query({
      query: (token) => `?func=Login&token=${token}`,
    }),
    getPhoto: builder.query({
      query: ({ token, id }) => `?func=GetPhoto&file_path=${id}&token=${token}`,
    }),
    uploadPhoto: builder.mutation({
      query: ({ token, image }) => {
        const formData = new FormData();
        formData.append("token", token);
        formData.append("image", image);
        return {
          url: `?func=UploadPhoto&token=${token}`,
          method: "POST",
          body: formData,
        };
      },
    }),
    editProfile: builder.mutation({
      query: ({ token, createData }) => ({
        url: `?token=${token}&func=EditProfile`,
        method: "POST",
        body: createData,
      }),
    }),
    getPurchases: builder.query({
      query: (token) => `?func=Purchases&token=${token}`,
    }),
    getPurchase: builder.query({
      query: ({ token, id }) =>
        `?func=Purchase&purchase_id=${id}&token=${token}`,
    }),
    getMemberPlan: builder.query({
      query: ({ token, id }) =>
        `?func=MemberPlan&member_id=${id}&token=${token}`,
    }),
    editMemberPlan: builder.mutation({
      query: ({ token, createData, id }) => ({
        url: `?func=EditMemberPlan&member_id=${id}&token=${token}`,
        method: "POST",
        body: createData,
      }),
    }),
    applyMethod: builder.mutation({
      query: ({ token, planType, id }) => ({
        url: `?func=ApplyMethod&member_id=${id}&token=${token}`,
        method: "POST",
        body: planType,
      }),
    }),
    editMemberMisc: builder.mutation({
      query: ({ token, id, miscData }) => ({
        url: `?func=MemberMisc&member_id=${id}&token=${token}`,
        method: "POST",
        body: miscData,
      }),
    }),
    getGroups: builder.query({
      query: (token) => `?func=Groups&token=${token}`,
    }),
    getGroupsDetail: builder.query({
      query: ({ token, id }) => `?func=Speech&group_id=${id}&token=${token}`,
    }),
    getNotes: builder.query({
      query: ({ token, id }) => `?func=Notes&group_id=${id}&token=${token}`,
    }),
    editNotes: builder.mutation({
      query: ({ token, createData, id }) => ({
        url: `?func=EditNotes&group_id=${id}&token=${token}`,
        method: "POST",
        body: createData,
      }),
    }),
    getAboutGroupDetail: builder.query({
      query: ({ token, id }) => `?func=Group&group_id=${id}&token=${token}`,
    }),
    getBilling: builder.query({
      query: ({ token }) => `?func=Bills&token=${token}`,
    }),
    getServices: builder.query({
      query: (token) => `?func=Services&token=${token}`,
    }),
    editServices: builder.mutation({
      query: ({ token, editData, id }) => ({
        url: `?func=EditService&service_id=${id}&token=${token}`,
        method: "POST",
        body: editData,
      }),
    }),
    createServices: builder.mutation({
      query: ({ token, createData }) => ({
        url: `?func=CreateService&token=${token}`,
        method: "POST",
        body: createData,
      }),
    }),
    getSchedule: builder.query({
      query: (token) => `?func=Schedules&token=${token}`,
    }),
    createSchedule: builder.mutation({
      query: ({ token, createData }) => ({
        url: `?func=CreateSchedule&token=${token}`,
        method: "POST",
        body: createData,
      }),
    }),
    getTrain: builder.query({
      query: (token) => `?func=Methods&token=${token}`,
    }),
    getMethod: builder.query({
      query: ({ token, id }) => `?func=Method&method_id=${id}&token=${token}`,
    }),
    //// запросы Clients
    getAllGroupsClients: builder.query({
      query: (token) => `?func=AllGroups&token=${token}`,
    }),
    getCustomerPlanClients: builder.query({
      query: ({ token, id }) => `?func=Group&group_id=${id}&token=${token}`,
    }),
    getAllExpertsClients: builder.query({
      query: (token) => `?func=AllExperts&token=${token}`,
    }),
    getExpertClients: builder.query({
      query: ({ token, id }) => `?func=Expert&expert_id=${id}&token=${token}`,
    }),
    getShortExpertClients: builder.query({
      query: ({ token, id }) =>
        `?func=GetService&service_id=${id}&token=${token}`,
    }),
    getBtnPayClients: builder.query({
      query: ({ token, schedules_id, service_id }) =>
        `?func=GetBill&service_id=${service_id}&schedules_id=${schedules_id}&token=${token}`,
    }),
    getBtnPay: builder.query({
      query: ({ token, group_id }) =>
        `?func=GetBill&group_id=${group_id}&token=${token}`,
    }),
    getQuestionnaire: builder.query({
      query: (token) => `?func=ProfileFields&token=${token}`,
    }),
    getQuestionnaireStartClient: builder.query({
      query: ({ token }) => `?func=MemberProfile&token=${token}`,
    }),
    getQuestionnaireStart: builder.query({
      query: ({ token, id }) =>
        `?func=MemberProfile&member_id=${id}&token=${token}`,
    }),
    EditMemberProfile: builder.mutation({
      query: ({ token, member_id, formData }) => ({
        url: `?token=${token}&func=EditMemberProfile&member_id=${member_id}`,
        method: "POST",
        body: formData,
      }),
    }),
    EditMemberProfileClient: builder.mutation({
      query: ({ token, formData }) => ({
        url: `?token=${token}&func=EditMemberProfile`,
        method: "POST",
        body: formData,
      }),
    }),
    ////////////////////Получение отчета///////////////////////////
    getMiscTypes: builder.query({
      query: (token) => `?func=MiscTypes&token=${token}`,
    }),
    //////////методы////////////////////
    getExercises: builder.query({
      query: ({ token }) => `?func=Exercises&token=${token}`,
    }),
    CreateMethod: builder.mutation({
      query: ({ token, createData }) => ({
        url: `?func=CreateMethod&token=${token}`,
        method: "POST",
        body: createData,
      }),
    }),
    EditMethod: builder.mutation({
      query: ({ token, createData, method_id }) => ({
        url: `?func=EditMethod&method_id=${method_id}&token=${token}`,
        method: "POST",
        body: createData,
      }),
    }),
    DeleteMethod: builder.mutation({
      query: ({ token, createData, method_id }) => ({
        url: `?func=DeleteMethod&method_id=${method_id}&token=${token}`,
        method: "POST",
        body: createData,
      }),
    }),
    CreateTraining: builder.mutation({
      query: ({ token, formData, method_id }) => ({
        url: `?func=CreateTraining&method_id=${method_id}&token=${token}`,
        method: "POST",
        body: formData,
      }),
    }),
    EditTraining: builder.mutation({
      query: ({ token, formData, method_id, training_id }) => ({
        url: `?func=EditTraining&method_id=${method_id}&training_id=${training_id}&token=${token}`,
        method: "POST",
        body: formData,
      }),
    }),
    CreateExercise: builder.mutation({
      query: ({ token, formData, method_id, training_id }) => ({
        url: `?func=CreateExercise&method_id=${method_id}&training_id=${training_id}&token=${token}`,
        method: "POST",
        body: formData,
      }),
    }),
    EditExercise: builder.mutation({
      query: ({ token, formData, method_id, training_id, exercise_id }) => ({
        url: `?func=EditExercise&method_id=${method_id}&training_id=${training_id}&exercise_id=${exercise_id}&token=${token}`,
        method: "POST",
        body: formData,
      }),
    }),
    DeleteExercise: builder.mutation({
      query: ({ token, formData, method_id, training_id, exercise_id }) => ({
        url: `?func=DeleteExercise&method_id=${method_id}&training_id=${training_id}&exercise_id=${exercise_id}&token=${token}`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetLoginQuery,
  useGetPhotoQuery,
  useEditProfileMutation,
  useUploadPhotoMutation,
  useGetPurchasesQuery,
  useGetPurchaseQuery,
  useGetMemberPlanQuery,
  useEditMemberPlanMutation,
  useApplyMethodMutation,
  useEditMemberMiscMutation,
  useGetGroupsQuery,
  useGetGroupsDetailQuery,
  useGetNotesQuery,
  useEditNotesMutation,
  useGetAboutGroupDetailQuery,
  useGetBillingQuery,
  useGetServicesQuery,
  useEditServicesMutation,
  useCreateServicesMutation,
  useGetScheduleQuery,
  useCreateScheduleMutation,
  useGetMiscTypesQuery,
  useGetTrainQuery,
  useGetMethodQuery,
  useGetAllGroupsClientsQuery,
  useGetCustomerPlanClientsQuery,
  useGetAllExpertsClientsQuery,
  useGetShortExpertClientsQuery,
  useGetExpertClientsQuery,
  useGetBtnPayClientsQuery,
  useGetQuestionnaireQuery,
  useGetQuestionnaireStartQuery,
  useGetQuestionnaireStartClientQuery,
  useEditMemberProfileMutation,
  useCreateMethodMutation,
  useDeleteMethodMutation,
  useGetBtnPayQuery,
  useEditMethodMutation,
  useEditMemberProfileClientMutation,
  useCreateTrainingMutation,
  useEditTrainingMutation,
  useCreateExerciseMutation,
  useEditExerciseMutation,
  useDeleteExerciseMutation,
  useGetExercisesQuery,
} = api;
