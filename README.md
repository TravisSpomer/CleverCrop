# Clever cropping

I used Azure Cognitive Services to analyze images to find the most important region, and then use that information to shift the image within the available space so that the most important part is as visible as possible. Good for thumbnails, social banners, and site background images.

1. Open the [clever cropping site](https://clever-crop.vercel.app) built from this repo.
2. Using the drag handle in the lower-right, make the image narrower until it's square. Notice that as pixels get cropped from the image, the image stays centered within the box.
3. Click the "Clever" checkbox. Now notice that the cherry tree moves so that more interesting content is visible in the same area.
4. Click "Cherry blossoms" and select "DeMarquan." As you shrink the image vertically, notice that his face stays visible in the cropped region even at a ridiculous aspect ratio like 4:1.
5. Uncheck the "Clever" checkbox and see how much more interesting the "Clever" crop is (unless you really like gym shorts).
6. Click "DeMarquan" and select "Custom URL." Enter a URL to any image on the internet (or drag the "example" link into the textbox) and click Load. After a few seconds, the image's contents were also used to generate a short description for the image, and you can resize it and compare how well the "clever" cropping works compared to the basic center cropping.
	* The effect is most noticeable on photos with an object that's far off-center. If you don't have a good example photo, try [this image](https://images.unsplash.com/photo-1616696269320-a4b68a57b1c1) in a tall, narrow container.
	
The cropping behavior isn't perfect. A better behavior for the cherry blossoms photo would be to crop off almost all of the empty sky before allowing any of the tree to be removed. That requires some more complex scaling math, and I ran out of time. One advantage of the current technique over a more complex one, though, is that after the necessary calculations are done, it produces static CSS and no client-side JavaScript.

## Running it locally

To run this locally:

* Copy `.env` to `.env.local`
* Set up an Azure Cognitive Services instance and then add its name and key to `.env.local`
* `npm install`
* `npm start`

---

© 2023 Travis Spomer, all rights reserved. The included sample images may not be reused elsewhere. It is provided as-is and no warranties are made as to its functionality or suitability.
