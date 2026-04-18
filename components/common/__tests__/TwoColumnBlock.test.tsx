import { render, screen } from "@testing-library/react";
import TwoColumnBlock from "../TwoColumnBlock";
import type { ComponentCommonTwoColumnBlock } from "graphql/types";
import {
  Enum_Componentcommontwocolumnblock_Imageposition as ImagePositionEnum,
} from "graphql/types";

describe("TwoColumnBlock", () => {
  it("supports the legacy flat media response used by the checked-in query", () => {
    const data = { id: "legacy", Image: { data: { url: "https://example.com/legacy.png", alternativeText: "Legacy image" } } } as unknown as ComponentCommonTwoColumnBlock;
    render(<TwoColumnBlock data={data} />);
    expect(screen.getByAltText("Legacy image")).toHaveAttribute("src", "https://example.com/legacy.png");
  });

  it("renders title, description, CTA, and image", () => {
    const data = {
      __typename: "ComponentCommonTwoColumnBlock",
      id: "two-col-1",
      TitleText: "Track your expenses",
      Description: "Keep spending under control with a simple monthly view.",
      ButtonText: "Read more",
      ButtonUrl: "https://example.com/read-more",
      ImagePosition: ImagePositionEnum.Left,
      Image: {
        data: {
          attributes: {
          url: "https://example.com/image.png",
          alternativeText: "Example image",
          previewUrl: "https://example.com/image-preview.png",
          },
        },
      },
    } as unknown as ComponentCommonTwoColumnBlock;

    render(<TwoColumnBlock data={data} />);

    expect(screen.getByText("Track your expenses")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Keep spending under control with a simple monthly view."
      )
    ).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "Read more" });
    expect(link).toHaveAttribute("href", "https://example.com/read-more");

    expect(screen.getByAltText("Example image")).toBeInTheDocument();
  });
});

