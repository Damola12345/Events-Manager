import db from '../models';

const { Center } = db;
export default {

  /**
   * @description adds a new center to the database
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} new center
   */
  create: (req, res) => {
    const {
      name, location, capacity, price, isAvailable
    } = req.body;

    return Center.create({
      name,
      location,
      capacity,
      price,
      isAvailable
    })
      .then(center => res.status(201).json({
        success: true,
        message: 'Center created succesfully!',
        center
      }))
      .catch(error => res.status(400).json({
        success: false,
        message: 'Something went wrong, unable to create center',
        error
      }));
  }, // end of centerController.create


  /**
   * @description updates Center information
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} updated center
   */
  update: (req, res) => {
    Center
      .findOne({
        where: {
          id: req.params.centerId
        }
      }).then((center) => {
        center.update(req.body)
          .then(updatedCenter => res.status(200).json({
            success: true,
            message: 'Center updated succesfully!',
            updatedCenter
          }))
          .catch(error => res.status(500).json({
            success: false,
            message: 'Could not update center',
            error: error.toString()
          }));
      })
      .catch(error => res.status(500).json({
        success: false,
        message: 'Center doesnt exist',
        error: error.toString()
      }));
  },

  // get all centers
  getAllCenters: (req, res) => Center
    .findAll()
    .then(centers => res.status(200).json({
      success: true,
      centers
    }))
    .catch(error => res.status(500).json({
      success: false,
      message: 'Could not get centers',
      error: error.toString()
    })),
};
