import math

# Let's test D3 geoTransverseMercator with rotation [74.5, -38.83333]
# Wait, or is the file ALREADY what you feed INTO d3.geoTransverseMercator?
# In D3:
# d3.geoTransverseMercator().rotate([74.5, -38.8333]).fitExtent(...)
# D3 projections take geographic coordinates [lon, lat] as INPUT!
# Wait! Does D3 take [-63.5, 44.6] as input, OR does it take [-75.5, 6.25] as input?
# Let's check!
# If D3 projection code in John Guerra's gist is:
# d3.geoTransverseMercator().rotate([74.5, -38.8333])
# Let's see what happens if you apply rotate([74.5, -38.8333]) to [-75.56, 6.25] vs [-63.55, 44.64]!

# Let's check D3 rotation [lambda0, phi0] = [74.5, -38.8333]:
# In D3, rotate([lambda0, phi0]):
# lambda_rot = lambda + lambda0 = -75.56 + 74.5 = -1.06 deg!
# phi_rot:
# Let's write the exact D3 rotate function:

def d3_rotation(lambda0_deg, phi0_deg, gamma0_deg=0):
    deltaLambda = math.radians(lambda0_deg)
    deltaPhi = math.radians(phi0_deg)
    deltaGamma = math.radians(gamma0_deg)
    
    cosDeltaPhi = math.cos(deltaPhi)
    sinDeltaPhi = math.sin(deltaPhi)
    cosDeltaGamma = math.cos(deltaGamma)
    sinDeltaGamma = math.sin(deltaGamma)
    
    def forward(lon_deg, lat_deg):
        lam = math.radians(lon_deg) + deltaLambda
        phi = math.radians(lat_deg)
        
        cosPhi = math.cos(phi)
        x = math.cos(lam) * cosPhi
        y = math.sin(lam) * cosPhi
        z = math.sin(phi)
        
        k = z * cosDeltaPhi - x * sinDeltaPhi
        return math.degrees(math.atan2(y * cosDeltaGamma - k * sinDeltaGamma,
                                       x * cosDeltaPhi + z * sinDeltaPhi)), \
               math.degrees(math.asin(k * cosDeltaGamma + y * sinDeltaGamma))

    def invert(x_deg, y_deg):
        # Inverse rotation
        lam = math.radians(x_deg)
        phi = math.radians(y_deg)
        
        cosPhi = math.cos(phi)
        x = math.cos(lam) * cosPhi
        y = math.sin(lam) * cosPhi
        z = math.sin(phi)
        
        # Invert gamma
        # Invert phi
        # Invert lambda
        # ...
        pass
        
    return forward

fwd = d3_rotation(74.5, -38.83333)

# Test real Medellin:
print("Medellin real (-75.56, 6.25) rotated:", fwd(-75.56, 6.25))
# Test real Bogota:
print("Bogota real (-74.08, 4.61) rotated:", fwd(-74.08, 4.61))
# Test real Leticia:
print("Leticia real (-69.94, -4.21) rotated:", fwd(-69.94, -4.21))
# Test real Barranquilla:
print("Barranquilla real (-74.80, 10.97) rotated:", fwd(-74.80, 10.97))
