// Controller for /api/services/nearby
exports.getNearbyServices = (req, res) => {
  res.status(200).json([
    { name: "Animal Care Clinic", type: "Clinic", distance: "2.3 km" },
    { name: "Paw Haven Shelter", type: "Shelter", distance: "3.1 km" },
    { name: "PetAid NGO", type: "NGO", distance: "1.8 km" }
  ])
}
