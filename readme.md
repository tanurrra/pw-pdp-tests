

# Assignment

Put together a simple test suite for [this page](https://www.creativefabrica.com/product/christmas-tree-lantern-bundle/) using TypeScript and Playwright - please don’t spend
more than three hours on this. For this assignment, we don’t expect you to test the full
functionality of the page, but focus on the most important elements and functionality (such as
product images, description etc) - the rest is up to you!
Additionally, we would like you to focus on testing SEO related page functionality.

## Test cases (some ideas)

PDP page has many components and sections, such as product title, price (for single purchace, free trial offer for guest users/users wtihout subscription), product images (carousel), reviews and rating, designer profile, tags, "more from this designer" section,  social media share buttons, add to favorites button, "also viewed" section etc. And shared components such as breadcrumbs, navigation, header and footer, banners etc. 

1. Verify Product Title and Description
Verify the product title matches "Christmas Tree Lantern Bundle".
Verify that the product description is present and readable.

2. Verify Product Images and Preview
Ensure all thumbnails load without error.
Click on each image to verify zoom/preview functionality (if applicable).
Validate image quality and resolution.

3. Check Price and Discount Information
Verify the displayed price matches backend/config values.
If there’s a discount, verify old price is shown with strikethrough and discount label is correct.

4. Verify Download/Buy Button Functionality
If user is logged in with appropriate access:
Button text should be "Download".
Click triggers download or takes user to the download page.
If user is not logged in:
Button should redirect to login or pricing page.

5. Verify Add to Favorites/Wishlist Button
Not logged in:
Clicking prompts login or signup.
Logged in: Clicking promts adds product to favorites list, maybe counter of favorites for product increased, maybe user icon is displayed in "added to favorites" section. 

6. Verify License Information
Ensure license type is visible and linked (e.g., Commercial License).
Clicking it should open license details in a new tab.

7. Check Product Metadata
Verify author/designer name is correct and links to their profile.
Validate number of downloads, favorites, and ratings (if shown).

8. Recommendation Section ("People also viewed")
Validate that similar or recommended products are shown.
Each product card should be clickable and open the correct PDP.

9. Breadcrumb Navigation
Check if breadcrumb path is accurate and each link navigates to the appropriate category.

10. Download File Validation (Post-Purchase or Free)
Downloaded file should match what's described (ZIP, correct format, content inside, etc.).
File is not corrupt and can be opened successfully.

Cross-Browser & Responsive Design Testing

11. PDP Loads Correctly Across Browsers
Chrome, Firefox, Safari, Edge (latest versions).

12. Responsive Design
Validate page layout on mobile, tablet, and desktop viewports.

13. Access Control
Try accessing a download URL directly without logging in — should redirect or deny.


### Assumptions:
- only English language tested with single currency, with fixed text

### Observed behavior:
- when swithcing currency back to USD $ from top menu, product detail box displays (discounted) price for single-purchase and button "Add to cart", next to text "Free" and button "Download for free". For EUR and GBR single-purchace 

# Run tests
### How to install

Make sure you have npm installed. 
Run ```npm install``` 

### How to run locally 

Run ```npx playwright test``` or with `--ui` option to run in [UI mode](https://playwright.dev/docs/test-ui-mode#running-your-tests):  ```npx playwright test --ui```

### How to run in GitHub
Project contains playwright.yml file inside a .github/workflows folder containing everything to tests run on each push and pull request into the main/master branch.
In GitHub, click on the Actions tab to see the workflows. Here you will see if your tests have passed or failed (see [docs](https://playwright.dev/docs/ci-intro#setting-up-github-actions)).
