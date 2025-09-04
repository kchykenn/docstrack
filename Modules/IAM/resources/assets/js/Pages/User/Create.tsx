import * as React from "react"
import { router, Head } from "@inertiajs/react"
import { useForm as useReactHookForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { BreadcrumbItem } from "@/types"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import AppLayout from "@/layouts/app-layout"

type Department = {
    depart_name: string
}

type Props = {
    departments: Department[]
}

type UserFormData = {
    prefix: string
    username: string
    first_name: string
    middle_name: string
    last_name: string
    name_extension: string
    email: string
    password: string
    sex: string
    civil_status: string
    birthdate: string
    mobile_number: string
    depart_name: string
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Users", href: "/iam/users" },
    { title: "Create User", href: "/users/create" },
]

export default function Create({ departments }: Props) {
    const [step, setStep] = React.useState(1)

    const form = useReactHookForm<UserFormData>({
        mode: "onChange",
        reValidateMode: "onChange",
        shouldFocusError: true,
        defaultValues: {
            prefix: "",
            username: "",
            first_name: "",
            middle_name: "",
            last_name: "",
            name_extension: "",
            email: "",
            password: "",
            sex: "",
            civil_status: "",
            birthdate: "",
            mobile_number: "",
            depart_name: "",
        },
    })

    const handleSubmit = (values: UserFormData) => {
        router.post("/iam/users/store", values, {
            onSuccess: () => {
                alert("User created successfully!")
                form.reset()
                router.visit("/iam/users")
            },
        })
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Users" />
            <div className="w-full max-w-6xl mx-auto p-6">
                <h1 className="text-xl font-semibold mb-6">Create User</h1>

                {/* Stepper Header */}
                <div className="relative flex items-center justify-between mb-8">
                    <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-300 -z-10"></div>

                    {["Personal Information", "User Account", "Confirm Account Creation"].map(
                        (label, i) => {
                            const stepIndex = i + 1
                            const isActive = step === stepIndex
                            const isCompleted = step > stepIndex

                            return (
                                <div
                                    key={i}
                                    className="flex-1 flex flex-col items-center relative"
                                >
                                    <div
                                        className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-colors z-10
                      ${isActive || isCompleted
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-gray-500 border-gray-300"
                                            }`}
                                    >
                                        {stepIndex}
                                    </div>
                                    <span
                                        className={`mt-2 text-sm font-medium transition-colors 
                      ${isActive || isCompleted ? "text-blue-600" : "text-gray-500"}`}
                                    >
                                        {label}
                                    </span>
                                    {i < 2 && (
                                        <div
                                            className={`absolute top-5 left-1/2 w-full h-0.5 -z-0 transition-colors 
                        ${isCompleted ? "bg-blue-600" : "bg-gray-300"}`}
                                        ></div>
                                    )}
                                </div>
                            )
                        }
                    )}
                </div>

                {/* Form */}
                <Form {...form}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault() // stop auto-submit on Enter
                        }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {/* Step 1 */}
                        {step === 1 && (
                            <>
                                {/* Prefix */}
                                <FormField
                                    control={form.control}
                                    name="prefix"
                                    rules={{ required: "Prefix is required" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Prefix</FormLabel>
                                            <Select
                                                onValueChange={(val) => {
                                                    field.onChange(val)
                                                    form.clearErrors("prefix")
                                                }}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select prefix" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Mr">Mr.</SelectItem>
                                                    <SelectItem value="Mrs">Mrs.</SelectItem>
                                                    <SelectItem value="Ms">Ms.</SelectItem>
                                                    <SelectItem value="Dr">Dr.</SelectItem>
                                                    <SelectItem value="Prof">Prof.</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="first_name"
                                    rules={{ required: "First name is required" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="John"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e)
                                                        form.clearErrors("first_name")
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="middle_name"
                                    rules={{ required: "Middle name is required" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Middle Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="sample"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e)
                                                        form.clearErrors("middle_name")
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="last_name"
                                    rules={{ required: "Last name is required" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Doe"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e)
                                                        form.clearErrors("last_name")
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="username"
                                    rules={{ required: "Email is required" }}
                                    render={({ field }) => (
                                        <FormItem className="col-span-2">
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="user@example.com"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e)
                                                        form.clearErrors("email")
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="sex"
                                    rules={{ required: "Sex is required" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sex</FormLabel>
                                            <Select
                                                onValueChange={(val) => {
                                                    field.onChange(val)
                                                    form.clearErrors("sex")
                                                }}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select sex" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="M">Male</SelectItem>
                                                    <SelectItem value="F">Female</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="civil_status"
                                    rules={{ required: "Civil status is required" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Civil Status</FormLabel>
                                            <Select
                                                onValueChange={(val) => {
                                                    field.onChange(val)
                                                    form.clearErrors("civil_status")
                                                }}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="single">Single</SelectItem>
                                                    <SelectItem value="married">Married</SelectItem>
                                                    <SelectItem value="widowed">Widowed</SelectItem>
                                                    <SelectItem value="divorced">Divorced</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="birthdate"
                                    rules={{ required: "Birthdate is required" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Birthdate</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="date"
                                                    value={
                                                        field.value
                                                            ? new Date(field.value).toISOString().split("T")[0]
                                                            : ""
                                                    }
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value)
                                                        form.clearErrors("birthdate")
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="mobile_number"
                                    rules={{ required: "Mobile number is required" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mobile Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="+639XXXXXXXXX"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e)
                                                        form.clearErrors("mobile_number")
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {/* Step 2 */}
                        {step === 2 && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    rules={{ required: "Username is required" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="johndoe@doh.com"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e)
                                                        form.clearErrors("username")
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    rules={{ required: "Password is required" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="********"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e)
                                                        form.clearErrors("password")
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Department */}
                                <FormField
                                    control={form.control}
                                    name="depart_name" // use ID, not name
                                    rules={{ required: "Department is required" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Department</FormLabel>
                                            <Select
                                                onValueChange={(val) => {
                                                    field.onChange(val)
                                                    form.clearErrors("depart_name")
                                                }}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select department" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {departments.map((dept, index) => (
                                                        <SelectItem key={index} value={dept.depart_name}>
                                                            {dept.depart_name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </>
                        )}

                        {/* Step 3 */}
                        {step === 3 && (
                            <div className="col-span-2">
                                <h2 className="text-lg font-semibold mb-2">Confirm Details</h2>
                                <pre className="bg-gray-100 p-4 rounded text-sm">
                                    {JSON.stringify(form.getValues(), null, 2)}
                                </pre>
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="col-span-2 flex justify-between pt-6">
                            {step > 1 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setStep(step - 1)}
                                >
                                    Back
                                </Button>
                            )}
                            {step < 3 ? (
                                <Button
                                    type="button"
                                    onClick={async () => {
                                        const stepFields =
                                            step === 1
                                                ? [
                                                    "prefix",
                                                    "first_name",
                                                    "middle_name",
                                                    "last_name",
                                                    "username",
                                                    "sex",
                                                    "civil_status",
                                                    "birthdate",
                                                    "mobile_number",
                                                ]
                                                : step === 2
                                                    ? ["email", "password", "depart_name"]
                                                    : []

                                        const isValid = await form.trigger(stepFields)

                                        if (isValid) {
                                            setStep(step + 1)
                                        }
                                    }}
                                >
                                    Next
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    onClick={form.handleSubmit(handleSubmit)} // submit only when clicked
                                >
                                    Save
                                </Button>
                            )}
                        </div>
                    </form>
                </Form>
            </div>
        </AppLayout>
    )
}
