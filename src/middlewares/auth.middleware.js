export function requirePin(req, res, next) {
  if (req.session?.authorized) return next();
  res.redirect('/pin');
}
