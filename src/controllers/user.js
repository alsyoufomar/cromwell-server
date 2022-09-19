const createUser = async (req, res) => {
  try {
    res.json({ data: 'Hello I am the new user!' });
  } catch (err) {
    return res.json({ err: err.message });
  }
};

module.exports = { createUser };
