export default function GET(req, res) {
  console.log(req.query.route, "reqreq");
  res.status(200).json({ test: 123 });
}
