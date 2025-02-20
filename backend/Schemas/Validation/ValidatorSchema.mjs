export const taskValidator = {
  title: {
    isString: {
      errorMessage: "Must Be a String",
    },
    isLength: {
      options: {
        min: 5,
        max: 30,
      },
      errorMessage: "Must Be between 5 and 20",
    },
  },
  description: {
    isString: {
      errorMessage: "Must Be a String",
    },
    isLength: {
      options: {
        min: 5,
        max: 75,
      },
      errorMessage: "Must Be between 5 and 50",
    },
  },
  due: {
    isString: {
      errorMessage: "Must Be a String",
    },
    isLength: {
      options: {
        min: 5,
        max: 50,
      },
      errorMessage: "Must Be between 5 and 25",
    },
  },
  priority: {
    isString: {
      errorMessage: "Must Be a String",
    },
    in: ['body'],
    isIn: {
      options: [['low', 'medium', 'high']],
      errorMessage: 'Priority must be one of: low, medium, high',
    },
    isLength: {
      options: {
        min: 2,
        max: 10,
      },
      errorMessage: "Must Be between 5 and 20",
    },
  },
  isFinished: {
    isBoolean: {
      errorMessage: "Must Be a finished or unfinished",
    },
  },
};
