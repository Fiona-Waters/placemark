/**
 * About controller using index method to render about.html page
 *
 * @author Fiona Waters
 * @date 25/03/2022
 * @version 3
 */

export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About CraftSpot",
      };
      return h.view("about-view", viewData);
    },
  },
};
