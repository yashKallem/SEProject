import { AllProjects } from "./action"

export const SelectEmail = (state) => state?.project?.email ?? null

export const SelectAllProjects = (state) => state?.project?.allProjects[0] 