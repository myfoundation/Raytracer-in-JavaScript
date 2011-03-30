function plane(p, n, color, material)
{
	this.p = p || vec.all(0)
	this.n = vec.norm(n || vec.all(vec.dim - 1))
	this.pn = vec.dot(this.p, this.n)
	this.color = color || [1, 1, 1]
	this.mat = material || mat.create()
}

plane.prototype.norm = function()
{
	return this.n
}

plane.prototype.trace = function(ray)
{	
	var s = ray.dir
	var n = this.n	
	var sn = vec.dot(s, n)	
	
	if (sn == 0) return
	
	var a = ray.from
	var pn = this.pn || vec.dot(this.p, n)
	var t = (pn - vec.dot(a, n)) / sn
	
	if (t < math.eps) return
		
	var q = new Array(a.length)
	
	for (var i = 0; i < a.length; i++)
		q[i] = a[i] + t * s[i]
		
	return {at:q, dist:t}
}

function axisplane(p, axis, color, material)
{
	this.p = p || vec.all(0)
	this.axis = axis || vec.dim - 1
	this.n = vec.e(this.axis)
	this.paxis = this.p[this.axis]
	this.color = color || [1, 1, 1]
	this.mat = material || mat.create()
}

axisplane.prototype.norm = function()
{
	return this.n
}

axisplane.prototype.trace = function(ray)
{	
	var axis = this.axis
	var s = ray.dir
	var sn = s[axis]	
	
	if (sn == 0) return
	
	var a = ray.from
	var t = (this.paxis - a[axis]) / sn
	
	if (t < math.eps) return
		
	var q = new Array(a.length)
	
	for (var i = 0; i < a.length; i++)
		q[i] = a[i] + t * s[i]
		
	return {at:q, dist:t}
}