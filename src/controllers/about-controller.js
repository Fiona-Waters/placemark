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