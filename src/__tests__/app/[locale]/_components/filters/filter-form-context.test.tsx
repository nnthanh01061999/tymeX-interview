import FilterForm, {
  useFilterForm
} from "@/app/[locale]/_components/filters/filter-form-context"
import { getValidatedParams } from "@/app/[locale]/util"
import useFilterQueryParams from "@/hooks/use-filter-query-params"
import { useResponsive } from "@/hooks/use-responsive"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { act } from "react-dom/test-utils"

jest.mock("@/hooks/use-filter-query-params", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    params: {
      q: "",
      tier: "",
      theme: "",
      category: "",
      price: []
    },
    setParams: jest.fn()
  }))
}))

jest.mock("@/hooks/use-responsive", () => ({
  useResponsive: jest.fn(() => ({
    isDesktop: false
  }))
}))

jest.mock("@/app/[locale]/util", () => ({
  getValidatedParams: jest.fn((data) => data)
}))

const FilterFormConsumer = () => {
  const { form, handleReset, handleFilter } = useFilterForm()

  return (
    <div>
      <div data-testid="form-values">{JSON.stringify(form.getValues())}</div>
      <button data-testid="reset-button" onClick={handleReset}>
        Reset
      </button>
      <button
        data-testid="filter-button"
        onClick={() => handleFilter(form.getValues())}>
        Filter
      </button>
    </div>
  )
}

describe("FilterForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders without crashing", () => {
    const { container } = render(
      <FilterForm>
        <div>Test Content</div>
      </FilterForm>
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  it("passes children through", () => {
    render(
      <FilterForm>
        <div data-testid="test-child">Test Content</div>
      </FilterForm>
    )

    expect(screen.getByTestId("test-child")).toBeInTheDocument()
    expect(screen.getByTestId("test-child").textContent).toBe("Test Content")
  })

  it("provides form context to children", () => {
    render(
      <FilterForm>
        <FilterFormConsumer />
      </FilterForm>
    )

    const formValues = screen.getByTestId("form-values")
    expect(formValues).toBeInTheDocument()

    const values = JSON.parse(formValues.textContent || "{}")
    expect(values).toHaveProperty("q", "")
    expect(values).toHaveProperty("tier", "")
    expect(values).toHaveProperty("theme", "")
    expect(values).toHaveProperty("category", "")
  })

  it("calls handleReset when reset button is clicked", async () => {
    const mockUseFilterQueryParams = useFilterQueryParams as jest.Mock
    const mockSetParams = jest.fn()
    mockUseFilterQueryParams.mockReturnValue({
      params: { q: "test", category: "hat" },
      setParams: mockSetParams
    })

    render(
      <FilterForm>
        <FilterFormConsumer />
      </FilterForm>
    )

    const resetButton = screen.getByTestId("reset-button")
    await act(async () => {
      await userEvent.click(resetButton)
    })

    expect(mockSetParams).toHaveBeenCalledWith({ data: {}, reset: true })
  })

  it("calls handleFilter when filter button is clicked", async () => {
    const mockUseFilterQueryParams = useFilterQueryParams as jest.Mock
    const mockSetParams = jest.fn()
    mockUseFilterQueryParams.mockReturnValue({
      params: { q: "test", category: "hat" },
      setParams: mockSetParams
    })

    const mockGetValidatedParams = getValidatedParams as jest.Mock
    mockGetValidatedParams.mockReturnValue({ q: "test", category: "hat" })

    render(
      <FilterForm>
        <FilterFormConsumer />
      </FilterForm>
    )

    const filterButton = screen.getByTestId("filter-button")
    await act(async () => {
      await userEvent.click(filterButton)
    })

    expect(mockGetValidatedParams).toHaveBeenCalled()
    expect(mockSetParams).toHaveBeenCalledWith({
      data: { q: "test", category: "hat" },
      reset: true
    })
  })

  it("calls handleFilter automatically on form value changes when on desktop", async () => {
    const mockUseResponsive = useResponsive as jest.Mock
    mockUseResponsive.mockReturnValue({ isDesktop: true })

    const mockUseFilterQueryParams = useFilterQueryParams as jest.Mock
    const mockSetParams = jest.fn()
    mockUseFilterQueryParams.mockReturnValue({
      params: { q: "", category: "" },
      setParams: mockSetParams
    })

    render(
      <FilterForm>
        <FilterFormConsumer />
      </FilterForm>
    )

    await waitFor(() => {
      expect(mockSetParams).toHaveBeenCalled()
    })
  })

  it("handles empty validated data", async () => {
    const mockUseFilterQueryParams = useFilterQueryParams as jest.Mock
    const mockSetParams = jest.fn()
    mockUseFilterQueryParams.mockReturnValue({
      params: { q: "", category: "" },
      setParams: mockSetParams
    })

    const mockGetValidatedParams = getValidatedParams as jest.Mock
    mockGetValidatedParams.mockReturnValue({})

    render(
      <FilterForm>
        <FilterFormConsumer />
      </FilterForm>
    )

    const filterButton = screen.getByTestId("filter-button")
    await act(async () => {
      await userEvent.click(filterButton)
    })

    expect(mockSetParams).toHaveBeenCalledWith({ data: {}, reset: true })
  })
})
