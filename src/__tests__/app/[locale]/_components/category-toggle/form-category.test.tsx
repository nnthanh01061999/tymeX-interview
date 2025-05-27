import FormCategory from "@/app/[locale]/_components/category-toggle/form-category"
import { render, screen } from "@testing-library/react"
import { useForm } from "react-hook-form"

jest.mock("@/app/[locale]/_components/category-toggle", () => ({
  __esModule: true,
  default: ({ options, value, onChange }: any) => (
    <div data-testid="mock-category-toggle" data-value={value}>
      {options.map((option: any) => (
        <span key={option.value} data-testid={`option-${option.value}`}>
          {option.label}
        </span>
      ))}
      <button
        data-testid="change-button"
        onClick={() => onChange && onChange("shirts")}>
        Change
      </button>
    </div>
  )
}))

jest.mock("@/components/ui/form", () => ({
  FormField: ({ name, render }: any) => (
    <div data-testid={`form-field-${name}`}>
      {render({ field: { value: "", onChange: jest.fn() } })}
    </div>
  ),
  FormItem: ({ children, className }: any) => (
    <div data-testid="form-item" className={className}>
      {children}
    </div>
  ),
  FormLabel: (props: any) => <label data-testid="form-label" {...props} />,
  FormControl: (props: any) => <div data-testid="form-control" {...props} />,
  FormDescription: (props: any) => (
    <p data-testid="form-description" {...props} />
  ),
  FormMessage: (props: any) => <p data-testid="form-message" {...props} />
}))

const TestComponent = ({
  options
}: {
  options: { label: string; value: string }[]
}) => {
  const form = useForm({
    defaultValues: {
      category: ""
    }
  })

  return (
    <FormCategory
      form={form}
      name="category"
      label="Category"
      description="Select a category"
      childrenProps={{ options }}
    />
  )
}

describe("FormCategory Component", () => {
  const mockOptions = [
    { label: "All", value: "all" },
    { label: "Shirts", value: "shirts" },
    { label: "Pants", value: "pants" }
  ]

  it("renders without crashing", () => {
    render(<TestComponent options={mockOptions} />)
    expect(screen.getByTestId("form-field-category")).toBeInTheDocument()
  })

  it("renders form components with correct structure", () => {
    render(<TestComponent options={mockOptions} />)

    expect(screen.getByTestId("form-item")).toBeInTheDocument()
    expect(screen.getByTestId("form-label")).toBeInTheDocument()
    expect(screen.getByTestId("form-control")).toBeInTheDocument()
    expect(screen.getByTestId("form-description")).toBeInTheDocument()
    expect(screen.getByTestId("form-message")).toBeInTheDocument()
  })

  it("renders label and description content", () => {
    render(<TestComponent options={mockOptions} />)

    expect(screen.getByTestId("form-label")).toHaveTextContent("Category")
    expect(screen.getByTestId("form-description")).toHaveTextContent(
      "Select a category"
    )
  })

  it("renders CategoryToggle with options", () => {
    render(<TestComponent options={mockOptions} />)

    expect(screen.getByTestId("mock-category-toggle")).toBeInTheDocument()

    mockOptions.forEach((option) => {
      expect(screen.getByTestId(`option-${option.value}`)).toHaveTextContent(
        option.label
      )
    })
  })
})
